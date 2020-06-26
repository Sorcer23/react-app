import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import ROUTES from "config/routes";

function passNotAuthUser(WrappedComponent) {
  return function(props) {
    const { isAuth, ..._props } = props;

    if (isAuth) return <Redirect to={ROUTES.home} />;

    return <WrappedComponent {..._props} />;
  };
}

export default compose(
  connect(state => {
    const { isAuth } = state.auth;

    return {
      isAuth
    };
  }),
  passNotAuthUser
);
