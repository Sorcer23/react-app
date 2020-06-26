import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select";

import OptionTags from "./OptionTags";
import Option from "./Option";
import Placeholder from "./Placeholder";

function Select(props) {
  const { placeholder, isMulti, error, getSelectProps } = props;

  const selectProps = getSelectProps();

  return (
    <div className="field field-select">
      <div className="field-label">{placeholder}</div>
      <div className="field__data">
        <ReactSelect
          {...selectProps}
          // menuIsOpen
          hideSelectedOptions={false}
          isClearable={false}
          components={{
            Option,
            MultiValue: () => null,
            IndicatorSeparator: () => null,
            Placeholder
          }}
        />
        {isMulti && <OptionTags {...selectProps} />}
      </div>
      {error != null && <div className="field-error">{error}</div>}
    </div>
  );
}

export default Select;
