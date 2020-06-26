import React from "react";
import { connect } from "react-redux";
import { Field } from "formik";
import { compose, withHandlers } from "recompose";
import { injectIntl } from "react-intl";

import Yup from "services/Yup";
import SignupModule, { config as signupConfig } from "modules/signup";
import withConnectedFormik from "HOC/withConnectedFormik";
import Input from "components/form/Input";
import Button from "components/Button";
import Icon, { ICON_NAMES } from "components/Icon";

function StepEmail(props) {
  const { isSubmitting, handleSubmit, handleResetStep, intl } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__body">
        <div className="quote">
          {intl.formatMessage({ id: "ui.auth.quote2_text" })}
          <span className="quote__author">
            {intl.formatMessage({ id: "ui.auth.quote2_author" })}
          </span>
        </div>
        <h2 className="title title--dark">
          {intl.formatMessage({ id: "ui.auth.step2_title" })}
        </h2>
        <Field
          name="email"
          type="email"
          icon={ICON_NAMES.mail}
          placeholder={intl.formatMessage({ id: "ui.fields.email" })}
          component={Input}
          maxLength="32"
        />
      </div>
      <div className="auth-form__footer">
        <Button
          type="submit"
          className="btn--width-100"
          showLoader={isSubmitting}
        >
          {intl.formatMessage({ id: "ui.actions.continue" })}
        </Button>
        {/* <button
          type='reset'
          className="skip"
          onClick={handleResetStep}
        >
          {intl.formatMessage({ id: 'ui.actions.skip' })}
        </button> */}
      </div>
    </form>
  );
}

export default compose(
  connect(null, {
    registerEmail: SignupModule.registerEmail,
    changeStep: SignupModule.changeStep
  }),

  withConnectedFormik({
    displayName: "registerEmail",

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required()
        .email()
    }),

    mapPropsToValues: () => ({
      email: ""
    }),

    handleSubmit: (values, formikBag) => {
      formikBag.props.registerEmail(values.email);
    }
  }),

  withHandlers({
    handleResetStep: props => event => {
      props.resetForm();
      props.changeStep(signupConfig.signupSteps.password);
    }
  }),
  injectIntl
)(StepEmail);
