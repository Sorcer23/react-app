import { compose, withHandlers, defaultProps } from "recompose";
import { connect } from "react-redux";

import withField from "HOC/withField";
import Select from "./Select";
import styles from "./style";

export default compose(
  connect(state => {
    return {
      isRtl: state.lang.locale === "ar"
    };
  }),
  withHandlers({
    getValue: props => () => {
      const { options, isMulti, field } = props;
      if (isMulti)
        return options.filter(option => field.value.includes(option.value));
      return options.find(
        option => option != null && option.value === field.value
      );
    }
  }),
  withHandlers({
    getSelectProps: props => () => {
      const {
        form,
        field,
        options,
        placeholder,
        isMulti,
        disabled,
        isRtl,
        isSearchable = false
      } = props;
      const value = props.getValue() || null;

      const selectProps = {
        value,
        options,
        placeholder,
        styles,
        isMulti,
        isRtl,
        isDisabled: disabled,
        isSearchable,
        onChange: value => {
          if (typeof props.onChange === "function") props.onChange(value.value);

          if (isMulti) {
            form.setFieldValue(
              field.name,
              value.map(option => option.value)
            );
            return;
          }

          form.setFieldValue(field.name, value.value);
        },
        onMenuClose: () => {
          form.setFieldTouched(field.name, true);
        }
      };

      if (isMulti) selectProps.closeMenuOnSelect = false;

      return selectProps;
    }
  }),
  withField
)(Select);
