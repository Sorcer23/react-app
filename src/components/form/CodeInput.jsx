import React, { useState } from "react";
import ReactCodeInput from "react-code-input";

import withField from "HOC/withField";

function CodeInput(props) {
  const { field, form, error, className } = props;

  return (
    <div className="field">
      <div className="field__data">
        <ReactCodeInput
          {...field}
          onChange={value => form.setFieldValue(field.name, value)}
          className="input-code"
          inputStyle={{ dispay: "block" }}
          type="number"
          fields={4}
          filterKeyCodes={[69]}
        />
        <span className="field-error">{error}</span>
      </div>
    </div>
  );
}

export default withField(CodeInput);
