import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const StyledContent = props => {
  const { html, type, color, className } = props;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={classNames(
        `${className} styled-content
      styled-content--color-${color}
      `,
        {
          [`styled-content--${type}`]: type != null
        }
      )}
    ></div>
  );
};

StyledContent.propTypes = {
  html: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(["white", "black", "grey"]),
  type: PropTypes.oneOf(["vacancy", "article", "info-page"])
};

StyledContent.defaultProps = {
  color: "black",
  className: ""
};

export default StyledContent;
