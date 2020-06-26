import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactTextarea from "react-textarea-autosize";

import withField from "HOC/withField";

const Textarea = ({
  field,
  error,
  hasValue,
  isFocused,
  setFocus,
  placeholder,
  readOnly,
  disabled,
  className,
  size
}) => {
  return (
    <label
      className={classNames(`field field--textarea ${className}`, {
        "field--focused": isFocused,
        "field--filled": hasValue,
        "field--error": error != null,
        [`field--size-${size}`]: size != null
      })}
    >
      <div className="field__data">
        <textarea
          {...field}
          className="field__input"
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={event => {
            field.onBlur(event);
            setFocus(false);
          }}
        />
        {(isFocused || hasValue) && (
          <span className="field-input__label field-label">{placeholder}</span>
        )}
        <span className="field-error">{error}</span>
      </div>
    </label>
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["lg"])
};

Textarea.defaultProps = {
  className: ""
};

export default withField(Textarea);
