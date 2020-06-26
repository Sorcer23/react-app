import React from "react";
import { connect } from "react-redux";
import { Field, withFormik } from "formik";
import { compose, withHandlers } from "recompose";
import { injectIntl } from "react-intl";

import Yup from "services/Yup";
import SignupModule, { config as signupConfig } from "modules/signup";
import Input from "components/form/Input";
import Button from "components/Button";
import { ICON_NAMES } from "components/Icon";

function StepPassword(props) {
  const { handleSubmit, handleResetStep, intl } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__body">
        <div className="quote">
          {intl.formatMessage({ id: "ui.auth.quote3_text" })}
          <span className="quote__author">
            {intl.formatMessage({ id: "ui.auth.quote3_author" })}
          </span>
        </div>
        <h2 className="title title--dark">
          {intl.formatMessage({ id: "ui.auth.step3_title" })}
        </h2>
        <Field
          name="password"
          type="password"
          icon={ICON_NAMES.lock}
          placeholder={intl.formatMessage({ id: "ui.fields.password" })}
          component={Input}
        />
      </div>
      <div className="auth-form__footer">
        <Button type="submit" className="btn--width-100">
          {intl.formatMessage({ id: "ui.actions.continue" })}
        </Button>
        {/* <button
          type='button'
          className="skip"
          onClick={handleResetStep}>
          {intl.formatMessage({ id: 'ui.actions.skip' })}
        </button> */}
      </div>
    </form>
  );
}

export default compose(
  connect(null, {
    changeStep: SignupModule.changeStep,
    setField: SignupModule.setField
  }),

  withFormik({
    mapPropsToValues: () => ({
      password: ""
    }),

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required()
        .min(9)
        .max(15)
    }),

    handleSubmit: (values, formikBag) => {
      const { setField, changeStep } = formikBag.props;

      setField("password", values.password);
      changeStep(signupConfig.signupSteps.restData);
    },

    displayName: "signupPassowrd"
  }),

  withHandlers({
    handleResetStep: props => event => {
      props.resetForm();
      props.changeStep(signupConfig.signupSteps.restData);
    }
  }),
  injectIntl
)(StepPassword);
