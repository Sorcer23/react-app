import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import NumberFormat from "react-number-format";

import withField from "HOC/withField";
import Icon, { ICON_NAMES } from "components/Icon";
import { Link } from "react-router-dom";

const Input = props => {
  const {
    field,
    form,
    error,
    hasValue,
    isFocused,
    setFocus,
    placeholder,
    readOnly,
    disabled,
    maxLength,
    className,
    icon,
    viewType
  } = props;

  const [type, setType] = useState(props.type);

  const inputAttr = {
    ...field,
    type,
    className: "field__input",
    placeholder,
    readOnly,
    disabled,
    maxLength,
    onFocus: () => setFocus(true),
    onBlur: event => {
      field.onBlur(event);
      setFocus(false);
    }
  };

  return (
    <label
      className={classNames(
        `field field-input field--type-${viewType} ${className}`,
        {
          "field--focused": isFocused,
          "field--filled": hasValue,
          "field--error": error != null,
          "field--disabled": readOnly || disabled
        }
      )}
    >
      {icon != null && (
        <div className="field__icon">
          <Icon name={ICON_NAMES[icon]} />
        </div>
      )}
      <div className="field__data">
        {type === "tel" ? (
          <NumberFormat
            {...inputAttr}
            allowEmptyFormatting
            isNumericString
            allowLeadingZeros={false}
            format={value => {
              return value;
            }}
            onValueChange={data => {
              form.setFieldValue(field.name, data.floatValue);
            }}
          />
        ) : (
          <input {...inputAttr} />
        )}
        {props.type === "password" && (
          <button
            type="button"
            className="show-password"
            onClick={() => {
              if (type === "text") setType("password");
              else setType("text");
            }}
          >
            <Icon name={ICON_NAMES.eye} active={type === "text"} />
          </button>
        )}
        {(isFocused || hasValue) && (
          <span className="field-input__label field-label">{placeholder}</span>
        )}
        <span className="field-error">{error}</span>
      </div>
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewType: PropTypes.oneOf(["type1", "type2"])
};

Input.defaultProps = {
  type: "text",
  className: "",
  maxLength: "",
  viewType: "type1",
  // for html
  form: {
    errors: {}
  },
  field: {
    name: "",
    onBlur: () => {}
  }
};

export default withField(Input);
