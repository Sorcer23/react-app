import React from "react";
import PropTypes from "prop-types";
import LinesEllipsisSource from "react-lines-ellipsis";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

import withMultiLangText from "HOC/withMultiLangText";

const defaults = {
  maxLine: "2",
  ellipsis: "...",
  basedOn: "words",
  style: { whiteSpace: "pre-wrap" }
};

const LinesEllipsis = props => {
  const { text, html, ...restProps } = props;

  if (text != null)
    return <LinesEllipsisSource {...defaults} {...restProps} text={text} />;

  if (html != null)
    return <HTMLEllipsis {...defaults} {...restProps} unsafeHTML={html} />;

  return null;
};

LinesEllipsis.propTypes = {
  // text: PropTypes.string,
  html: PropTypes.string
};

export default withMultiLangText(LinesEllipsis);
