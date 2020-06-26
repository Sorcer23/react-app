import React from "react";
import { connect } from "react-redux";
import { Field } from "formik";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import Yup from "services/Yup";
import SignupModule from "modules/signup";
import withConnectedFormik from "HOC/withConnectedFormik";
import Input from "components/form/Input";
import InputPhone from "components/form/InputPhone";
import Button from "components/Button";
import { ICON_NAMES } from "components/Icon";

function StepRegisterPhone(props) {
  const { isSubmitting, handleSubmit, intl } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__body">
        <div className="quote">
          {intl.formatMessage({ id: "ui.auth.quote1_text" })}
          <span className="quote__author">
            {intl.formatMessage({ id: "ui.auth.quote1_author" })}
          </span>
        </div>
        <h2 className="title title--dark">
          {intl.formatMessage({ id: "ui.auth.step1_title" })}
        </h2>
        <Field
          name="phone"
          placeholder={intl.formatMessage({ id: "ui.fields.phone" })}
          component={InputPhone}
        />
      </div>
      <div className="auth-form__footer">
        <Button
          type="submit"
          icon={ICON_NAMES.phone}
          className="authorization__btn"
          showLoader={isSubmitting}
        >
          {intl.formatMessage({ id: "ui.actions.continue" })}
        </Button>
      </div>
    </form>
  );
}

export default compose(
  connect(
    state => {
      const { phone } = state.signup;

      return {
        phone
      };
    },
    {
      registerPhone: SignupModule.registerPhone
    }
  ),
  withConnectedFormik({
    displayName: "registerPhone",

    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),

    mapPropsToValues: props => {
      return {
        phone: props.phone
      };
    },

    handleSubmit: (values, formikBag) => {
      formikBag.props.registerPhone(values.phone);
    }
  }),
  injectIntl
)(StepRegisterPhone);
