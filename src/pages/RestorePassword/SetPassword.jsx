import React from "react";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { withFormik, Field } from "formik";

import Yup from "services/Yup";
import Button from "components/Button";
import Input from "components/form/Input";

function SetPassword(props) {
  const { intl, handleSubmit, isSubmitting } = props;

  return (
    <form onSubmit={handleSubmit} className="authorization__right-col">
      <div className="authorization__logo">
        <img src="/img/logo.svg" alt="" />
      </div>
      <div className="quote">
        “Every artist was first an amateur”
        <span className="quote__author">-Ralph Waldo Emerson</span>
      </div>
      <h2 className="title title--dark">Forgot Password?</h2>
      <div className="row">
        <div className="col-12">
          <Field
            name="password"
            type="password"
            placeholder={intl.formatMessage({ id: "ui.fields.password" })}
            component={Input}
          />
        </div>
        <div className="col-12">
          <Field
            name="passwordRepeat"
            type="password"
            placeholder={intl.formatMessage({
              id: "ui.fields.password_repeat"
            })}
            component={Input}
          />
        </div>
      </div>
      <Button type="submit" showLoader={isSubmitting}>
        {intl.formatMessage({ id: "ui.actions.submit" })}
      </Button>
    </form>
  );
}

export default compose(
  injectIntl,
  withFormik({
    displayName: "setPassword",

    mapPropsToValues: () => ({
      password: "",
      passwordRepeat: ""
    }),

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required()
        .min(9)
        .max(15),
      passwordRepeat: Yup.string()
        .required()
        .min(9)
        .max(15)
    }),

    handleSubmit: (values, formikBag) => {
      formikBag.props.onSetPassword(values, formikBag);
    }
  })
)(SetPassword);
