import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";

import ROUTES from "config/routes";

function passAuthUser(Component) {
  return function(props) {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={ROUTES.signin} />;

    return <Component {...restProps} />;
  };
}

export default compose(
  connect(state => {
    const { isAuth } = state.auth;

    return {
      isAuth
    };
  }),
  passAuthUser
);
