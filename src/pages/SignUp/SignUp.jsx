import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ROUTES from "config/routes";
import passNotAuthUser from "HOC/passNotAuthUser";
import SignUpHead from "./SignUpHead";
import SignUpBody from "./SignUpBody";
import Icon, { ICON_NAMES } from "components/Icon";

function SignUp(props) {
  const { isAuth, isSignupInProgress } = props;

  if (isAuth && !isSignupInProgress) return <Redirect to={ROUTES.home} />;

  return (
    <div className="wrapper">
      <main className="main main--authorization">
        <section className="authorization">
          <div className="authorization__background"></div>
          <div className=" authorization__inner">
            <SignUpHead />
            <SignUpBody />
          </div>
        </section>
      </main>
    </div>
  );
}

export default connect(state => {
  return {
    isAuth: state.auth.isAuth,
    isSignupInProgress: state.signup.inProgress
  };
})(SignUp);
