import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import preloader from "HOC/preloader";

const Container = props => {
  if (props.href)
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );

  if (props.to) return <Link {...props}>{props.children}</Link>;

  return <button {...props}>{props.children}</button>;
};

function Button(props) {
  const {
    className,
    href,
    to,
    disabled,
    type,
    onClick,
    children,
    size,
    width,
    withBorder,
    light,
    preloader,
    preloaderContainerStyle
  } = props;

  const attr = { className, href, to, type, disabled, onClick };

  return (
    <Container
      {...attr}
      style={preloaderContainerStyle}
      className={classNames(`${className} btn btn--size-${size}`, {
        [`btn--width-${width}`]: width != null,
        "btn--with-border": withBorder,
        "btn--light": light
      })}
    >
      {children}
      {preloader}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  size: PropTypes.oneOf(["lg", "md", "sm", "xs"]),
  icon: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  showLoader: PropTypes.bool,
  width: PropTypes.oneOf(["100"]),
  withBorder: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: "",
  disabled: false,
  type: "button",
  size: "sm"
};

export default preloader(Button);
