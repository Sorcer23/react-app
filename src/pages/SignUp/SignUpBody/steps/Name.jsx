import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field } from "formik";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import Yup from "services/Yup";
import SignupModule, { config as signupConfig } from "modules/signup";
import withConnectedFormik from "HOC/withConnectedFormik";
import Input from "components/form/Input";
import Button from "components/Button";
import Icon, { ICON_NAMES } from "components/Icon";

function StepName(props) {
  const { handleSubmit, isSubmitting, intl } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__body">
        <div className="quote">
          {intl.formatMessage({ id: "ui.auth.quote4_text" })}
          <span className="quote__author">
            {intl.formatMessage({ id: "ui.auth.quote3_author" })}
          </span>
        </div>
        <h2 className="title title--dark">
          {intl.formatMessage({ id: "ui.auth.step4_title" })}
        </h2>
        <Field
          name="firstName"
          type="text"
          icon={ICON_NAMES.userDark}
          placeholder={intl.formatMessage({ id: "ui.fields.first_name" })}
          component={Input}
        />
        <Field
          name="lastName"
          type="text"
          icon={ICON_NAMES.userDark}
          placeholder={intl.formatMessage({ id: "ui.fields.last_name" })}
          component={Input}
        />
      </div>
      <div className="auth-form__footer">
        <p className="terms-link">
          {intl.formatMessage({ id: "ui.auth.agreement_terms_conditions" })}
          <a className="link" href="#">
            {" "}
            {intl.formatMessage({ id: "ui.actions.terms_conditions" })}
          </a>
        </p>

        <Button type="submit" with-100 showLoader={isSubmitting}>
          {intl.formatMessage({ id: "ui.actions.submit" })}
        </Button>
      </div>
    </form>
  );
}

export default compose(
  connect(
    state => {
      const { isLoading } = state.signup;

      return {
        isLoading
      };
    },
    {
      changeStep: SignupModule.changeStep,
      setField: SignupModule.setField,
      finishSignup: SignupModule.finishSignup
    }
  ),

  withConnectedFormik({
    mapPropsToValues: () => ({
      firstName: "",
      lastName: ""
    }),

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required()
    }),

    handleSubmit: (values, formikBag) => {
      const { setField, finishSignup } = formikBag.props;

      setField("firstName", values.firstName);
      setField("lastName", values.lastName);

      finishSignup();
    },

    displayName: "registerName"
  }),
  injectIntl
)(StepName);
