import React, { Fragment } from "react";
import { compose, lifecycle, withHandlers } from "recompose";
import classNames from "classnames";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import _ from "lodash";

import withMap from "HOC/withMap";
import withModal from "HOC/withModal";
import withField from "HOC/withField";
import AddAddressByMap from "components/AddAddressByMap";
import SelectedLocationTags from "./SelectedLocationTags";

export default compose(
  // withMap(),
  withModal("map"),
  withField,
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        // places: [],
        // onSearchBoxMounted: (ref) => {
        //   refs.searchBox = ref;
        // },
        // onSearchInputMounted: (ref) => {
        //   refs.searchInput = ref;
        // },
        // onPlacesChanged: () => {
        //   const { form, field } = this.props;
        //   const location = refs.searchBox.getPlaces()[0].formatted_address;

        //   refs.searchInput.value = '';
        //   const locationsSet = new Set([...field.value, location]);
        //   form.setFieldValue(field.name, Array.from(locationsSet));
        // },
        onPlacesSave: location => {
          const { form, field, setFocus, closeModal } = this.props;

          const locationsSet = new Set([...field.value, location.address1]);
          closeModal("map");
          form.setFieldValue(field.name, Array.from(locationsSet));
        }
      });
    }
  }),
  withHandlers({
    handleDelete: props => locationToDelete => {
      const { form, field } = props;

      form.setFieldValue(
        field.name,
        field.value.filter(location => location !== locationToDelete)
      );
    }
  })
)(props => {
  const {
    field,
    form,
    error,
    hasValue,
    isFocused,
    placeholder,
    readOnly,
    disabled,
    className = "",
    modals,
    openModal,
    onPlacesSave,
    closeModal,
    setFocus,
    handleDelete
  } = props;

  return (
    // <StandaloneSearchBox
    //   ref={props.onSearchBoxMounted}
    //   bounds={props.bounds}
    //   onPlacesChanged={props.onPlacesChanged}
    // >
    <Fragment>
      <AddAddressByMap
        isOpen={modals["map"]}
        onRequestClose={() => closeModal("map")}
        onSave={onPlacesSave}
      />

      <label
        className={classNames(`field ${className}`, {
          "field--focused": isFocused,
          // 'field--filled': hasValue,
          "field--error": error != null
        })}
      >
        <div className="field__data">
          <input
            // ref={props.onSearchInputMounted}
            type="text"
            className="field__input"
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            onFocus={() => {
              setFocus(true);
            }}
            onClick={() => openModal("map")}
            onBlur={event => {
              field.onBlur(event);
              setFocus(false);
            }}
          />
          {isFocused && (
            <span className="field-input__label field-label">
              {placeholder}
            </span>
          )}
          <span className="field-error">{error}</span>
        </div>
      </label>
      <SelectedLocationTags locations={field.value} onDelete={handleDelete} />
    </Fragment>
    // </StandaloneSearchBox>
  );
});
