import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";

import ROUTES from "config/routes";
import { config as accountConfig } from "modules/account";

function passProvider(WrappedComponent) {
  return function(props) {
    const { status, ..._props } = props;

    if (status !== accountConfig.PROVIDER_STATUSES.approved)
      return <Redirect to={ROUTES.home} />;

    return <WrappedComponent {..._props} />;
  };
}

export default compose(
  connect(state => {
    const { serviceProviderStatus } = state.account.user;

    return {
      status: serviceProviderStatus
    };
  }),
  passProvider
);
