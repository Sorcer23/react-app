import React from "react";
import { Field } from "formik";
import { injectIntl } from "react-intl";
import { compose, withProps, lifecycle } from "recompose";

import Icon, { ICON_NAMES } from "components/Icon";
import Modal from "components/modals/Modal";
import Input from "components/form/Input";
import Button from "components/Button";
import AddressSideMap from "./AddressSideMap";
import withMap from "HOC/withMap";

function ModalWholeAddress(props) {
  const {
    intl,
    values,
    initialValues,
    isOpen,
    onRequestClose,
    isSubmitting,
    isEdit,
    submitForm
  } = props;

  const markerPosition = {
    lat: parseFloat(values.lat),
    lng: parseFloat(values.lng)
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="popup popup-map">
        <div className="popup__head">
          <div className="popup__title">
            {intl.formatMessage({
              id: isEdit
                ? "ui.navigation.address_edit"
                : "ui.profile.add_new_address"
            })}
          </div>
        </div>
        <div className="popup__body popup-map__inner">
          <div className="popup-map__content row">
            <div className="col-md-5 popup-map__map-wrap">
              <div className="popup-map__map">
                <AddressSideMap markerPosition={markerPosition} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="popup-map__form">
                <Field
                  name="name"
                  placeholder={intl.formatMessage({ id: "ui.fields.name" })}
                  component={Input}
                />
                <Field
                  name="phone"
                  placeholder={intl.formatMessage({ id: "ui.fields.phone" })}
                  type="tel"
                  component={Input}
                />
                <Field
                  name="address1"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.address_line_1"
                  })}
                  component={Input}
                  disabled
                />
                <Field
                  name="address2"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.address_line_2"
                  })}
                  component={Input}
                />
                <Field
                  name="city"
                  placeholder={intl.formatMessage({ id: "ui.fields.city" })}
                  component={Input}
                  disabled={!!initialValues.city}
                />
                <Field
                  name="country"
                  placeholder={intl.formatMessage({ id: "ui.fields.country" })}
                  component={Input}
                  disabled={!!initialValues.country}
                />
                {/* <Field
                  name="landmark"
                  placeholder={intl.formatMessage({ id: 'ui.fields.landmark' })}
                  component={Input}
                /> */}
                <Field
                  name="aptNumber"
                  type="tel"
                  placeholder={intl.formatMessage({ id: "ui.fields.zip_code" })}
                  component={Input}
                  disabled={!!initialValues.aptNumber}
                />

                <div className="row">
                  <div className="col-6">
                    {/* <button type='submit' className="btn btn--width-100">
                    </button> */}
                    <Button
                      type="submit"
                      showLoader={isSubmitting}
                      width="100"
                      onClick={submitForm}
                    >
                      {intl.formatMessage({ id: "ui.actions.save" })}
                    </Button>
                  </div>
                  {/* <div className="col-6">
                    <button className="btn btn--light btn--width-100">
                      {intl.formatMessage({ id: 'ui.actions.save_and_new' })}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default compose(
  withProps(props => {
    return {
      isEdit: props.values.id != null
    };
  }),
  injectIntl
)(ModalWholeAddress);
