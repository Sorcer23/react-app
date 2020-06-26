import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withField from "HOC/withField";
import CheckboxMarker from "./CheckboxMarker";

const Checkbox = props => {
  const {
    field,
    form,
    data,
    readOnly,
    disabled,
    className,
    isGroup,
    isMarkerRight
  } = props;

  const isChecked = isGroup ? field.value.includes(data.value) : field.value;
  const placeholder = isGroup ? data.label : props.placeholder;

  return (
    <label
      className={classNames(`field checkbox ${className}`, {
        "checkbox--checked": isChecked,
        "checkbox--marker-right": isMarkerRight
      })}
    >
      <input
        {...field}
        type="checkbox"
        checked={isChecked}
        onChange={event => {
          const { checked } = event.target;

          if (isGroup) {
            if (checked)
              form.setFieldValue(field.name, [...field.value, data.value]);
            else
              form.setFieldValue(
                field.name,
                field.value.filter(id => data.value !== id)
              );

            return;
          }

          form.setFieldValue(field.name, event.target.checked);
        }}
      />

      {isMarkerRight ? (
        <Fragment>
          <div className="checkbox__title">{placeholder}</div>
          <CheckboxMarker isChecked={isChecked} />
        </Fragment>
      ) : (
        <Fragment>
          <CheckboxMarker isChecked={isChecked} />
          <div className="checkbox__title">{placeholder}</div>
        </Fragment>
      )}
    </label>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  isMarkerRight: PropTypes.bool,
  data: PropTypes.object,
  isGroup: PropTypes.bool
};

Checkbox.defaultProps = {
  className: "",
  isMarkerRight: false,
  isGroup: false
};

export default withField(Checkbox);
