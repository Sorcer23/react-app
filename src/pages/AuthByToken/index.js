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

import ROUTES from "config/routes";
import AuthModule from "modules/auth";
import AccountModule from "modules/account";
import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";

function AuthByToken(props) {
  return <Redirect to={ROUTES.home} />;
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
    const { token } = props.match.params;

    return {
      token
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
  branch(
    props =>
      !props.isAuth || !props.isUserInit || props.token !== props.currentToken,
    renderComponent(PagePreloader)
  )
)(AuthByToken);
