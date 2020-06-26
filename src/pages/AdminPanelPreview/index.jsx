import React from "react";
import { connect } from "react-redux";
import {
  compose,
  withProps,
  withState,
  branch,
  renderComponent,
  withPropsOnChange
} from "recompose";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import ApiService from "services/api/ApiService";
import ROUTES from "config/routes";
import AuthModule from "modules/auth";
import AccountModule from "modules/account";
import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";

function AdminPanelPreview(props) {
  const { redirectPath } = props;

  return <Redirect to={redirectPath} />;
}

function getRedirectPath(type) {
  switch (type) {
    case "serviceProvider": {
      return ROUTES.serviceProviderPreview;
    }
    case "service": {
      return ROUTES.providerServicePreview;
    }
    case "product": {
      return ROUTES.providerProductPreview;
    }
    case "post": {
      return ROUTES.providerPostPreview;
    }
    default: {
      return null;
    }
  }
}

export default compose(
  connect(
    state => {
      return {
        isAuth: state.auth.isAuth,
        currentToken: state.auth.token,
        isUserInit: state.account.user.id != null
      };
    },
    {
      initUser: AuthModule.initUser,
      resetUser: AuthModule.reset,
      getAccount: AccountModule.getAccount
    }
  ),
  withProps(props => {
    const { jwt: token, type, id } = queryString.parse(props.location.search);

    return {
      token,
      redirectPath: `${getRedirectPath(type)}/${id}`
    };
  }),
  withPropsOnChange(["isAuth"], props => {
    if (props.isAuth && props.token === props.currentToken) {
      props.getAccount();
      return;
    } else {
      props.resetUser(false);
      props.initUser(props.token);
    }
  }),
  branch(props => props.redirectPath == null, renderComponent(NotFound)),
  branch(
    props =>
      !props.isAuth || !props.isUserInit || props.token !== props.currentToken,
    renderComponent(PagePreloader)
  )
)(AdminPanelPreview);
