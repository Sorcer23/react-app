import React from "react";
import PropTypes from "prop-types";

import withMultiLangText from "HOC/withMultiLangText";

function MultiLangContent(props) {
  return props.text;
}

export default withMultiLangText(MultiLangContent);
