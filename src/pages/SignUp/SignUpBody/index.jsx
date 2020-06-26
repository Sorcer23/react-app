import React, { Fragment } from "react";
import { connect } from "react-redux";

import { config as signupConfig } from "modules/signup";
import SwitchStep from "./SwitchStep";

function SignUpBody(props) {
  const { step } = props;

  return (
    <div className="authorization__right-col column-smaller">
      <div className="authorization-steps">
        <span className="active">{step.order}</span> /
        <span>{Object.keys(signupConfig.signupSteps).length}</span>
      </div>
      <div className="authorization__logo">
        <img src="/img/logo.svg" alt="" />
      </div>

      <SwitchStep />
    </div>
  );
}

export default connect(state => {
  return {
    step: state.signup.step
  };
})(SignUpBody);
