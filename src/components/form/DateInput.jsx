import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import { compose } from "recompose";
import moment from "moment";

import withField from "HOC/withField";
import Icon, { ICON_NAMES } from "components/Icon";

const DateInput = props => {
  const {
    field,
    form,
    placeholder,
    readOnly,
    disabled,
    className,
    icon,
    hasValue,
    error,
    isFocused,
    setFocus,
    pickerAttr
  } = props;

  return (
    <label
      className={classNames(`field field-date ${className}`, {
        "field--focused": isFocused,
        "field--filled": hasValue,
        "field--error": error != null
      })}
    >
      {icon != null && (
        <div className="field__icon">
          <Icon name={ICON_NAMES[icon]} />
        </div>
      )}
      <div className="field__data">
        <DatePicker
          className="field__input"
          placeholderText={placeholder}
          selected={field.value ? moment(field.value).toDate() : field.value}
          onChange={date => {
            form.setFieldValue(field.name, moment(date).toISOString());
          }}
          onCalendarOpen={() => setFocus(true)}
          onCalendarClose={() => setFocus(false)}
          {...pickerAttr}
        />
        {(isFocused || hasValue) && (
          <span className="field-input__label field-label">{placeholder}</span>
        )}
      </div>
      <span className="field-error">{error}</span>
    </label>
  );
};

DateInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  pickerAttr: PropTypes.object
};

DateInput.defaultProps = {
  className: "",
  pickerAttr: {}
};

export default compose(withField)(DateInput);
