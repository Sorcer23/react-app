import React from "react";
import { css } from "emotion";
import { components } from "react-select";

import CheckboxMarker from "components/form/CheckboxMarker";

function Option(props) {
  const { innerRef, innerProps, isSelected, isMulti, label, getStyles } = props;

  if (isMulti) {
    return (
      <div
        ref={innerRef}
        className={css(getStyles("option", props))}
        {...innerProps}
      >
        <CheckboxMarker
          isChecked={isSelected}
          className="select__check-marker"
        />
        <span className="option-label">{label}</span>
      </div>
    );
  }

  return <components.Option {...props} />;
}

export default Option;
