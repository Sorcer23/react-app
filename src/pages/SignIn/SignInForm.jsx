import React from "react";
import { connect } from "react-redux";
import { Field } from "formik";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

import Yup from "services/Yup";
import ROUTES from "config/routes";
import AuthModule from "modules/auth";
import withConnectedFormik from "HOC/withConnectedFormik";
import Button from "components/Button";
import Input from "components/form/Input";
import InputPhone from "components/form/InputPhone";
import { ICON_NAMES } from "components/Icon";

function SignInForm(props) {
  const {
    intl,
    authMethod,
    isSubmitting,
    onAuthMethodChange,
    handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {authMethod === "phone" && (
        <Field
          name="phone"
          placeholder={intl.formatMessage({ id: "ui.fields.phone" })}
          component={InputPhone}
        />
      )}
      {authMethod === "email" && (
        <Field
          name="email"
          type="email"
          icon={ICON_NAMES.mail}
          placeholder={intl.formatMessage({ id: "ui.fields.email" })}
          maxLength="32"
          component={Input}
        />
      )}
      <Field
        name="password"
        type="password"
        icon={ICON_NAMES.lock}
        placeholder={intl.formatMessage({ id: "ui.fields.password" })}
        component={Input}
      />

      <div className="row  justify-content-center justify-content-md-end">
        <div className="col-auto">
          <Link to={ROUTES.restorePassword} className="link-forgot">
            {intl.formatMessage({ id: "ui.actions.forgot" })}
          </Link>
        </div>
      </div>

      <Button type="submit" showLoader={isSubmitting}>
        {intl.formatMessage({ id: "ui.actions.sign_in" })}
      </Button>

      <button
        type="button"
        className="authorization__help-text"
        onClick={onAuthMethodChange}
      >
        {authMethod === "phone" &&
          `${intl.formatMessage({ id: "ui.actions.use_email" })}`}
        {authMethod === "email" &&
          `${intl.formatMessage({ id: "ui.actions.use_mobile_number" })}`}
      </button>
    </form>
  );
}

export default compose(
  connect(null, {
    signin: AuthModule.signin
  }),
  withConnectedFormik({
    displayName: "signin",

    mapPropsToValues: () => ({
      phone: "",
      password: "",
      email: ""
    }),

    validationSchema: props => {
      const { authMethod } = props;

      return Yup.object().shape({
        phone: authMethod === "phone" && Yup.string().required(),
        password: Yup.string().required(),
        email:
          authMethod === "email" &&
          Yup.string()
            .required()
            .email()
      });
    },

    handleSubmit: (values, formikBag) => {
      const { authMethod, signin } = formikBag.props;
      const sentData =
        authMethod === "phone"
          ? { phone: values.phone, password: values.password }
          : { email: values.email, password: values.password };

      signin(sentData);
    }
  }),
  injectIntl
)(SignInForm);
