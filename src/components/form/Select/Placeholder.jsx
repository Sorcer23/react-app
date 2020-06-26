import React from "react";
import { css } from "emotion";
import { components } from "react-select";

function Placeholder(props) {
  const { isFocused } = props;

  if (isFocused) return null;

  return <components.Placeholder {...props} />;
}

export default Placeholder;
