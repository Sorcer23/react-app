import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import { compose } from "recompose";
import moment from "moment";

import withField from "HOC/withField";
import Icon, { ICON_NAMES } from "components/Icon";

const TimeInput = props => {
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

  const [hour, minute] = field.value ? field.value.split(":") : "";

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
          selected={
            field.value
              ? moment()
                  .set({
                    hour,
                    minute
                  })
                  .toDate()
              : field.value
          }
          onCalendarOpen={() => setFocus(true)}
          onCalendarClose={() => setFocus(false)}
          showTimeSelect
          showTimeSelectOnly
          dateFormat="h:mm aa"
          timeIntervals={60}
          onChange={date => {
            form.setFieldValue(field.name, moment(date).format("hh:mm"));
          }}
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

TimeInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  pickerAttr: PropTypes.object
};

TimeInput.defaultProps = {
  className: "",
  pickerAttr: {}
};

export default compose(withField)(TimeInput);
