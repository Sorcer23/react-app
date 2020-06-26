import React, { Fragment } from "react";
import { connect } from "react-redux";

import { config as authConfig } from "modules/signup";

import RegisterPhone from "./steps/RegisterPhone";
import Email from "./steps/Email";
import Password from "./steps/Password";
import Name from "./steps/Name";

function SwitchStep(props) {
  const stepId = props.step.id;

  switch (stepId) {
    case authConfig.signupSteps.registerPhone.id:
      return <RegisterPhone />;

    case authConfig.signupSteps.email.id:
      return <Email />;

    case authConfig.signupSteps.password.id:
      return <Password />;

    case authConfig.signupSteps.restData.id:
      return <Name />;

    default:
      return null;
  }
}

export default connect(state => {
  return {
    step: state.signup.step
  };
})(SwitchStep);
