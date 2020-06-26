import React from "react";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { withFormik, Field } from "formik";

import Yup from "services/Yup";
import Button from "components/Button";
import InputPhone from "components/form/InputPhone";

function RequestRestore(props) {
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
            name="phone"
            placeholder={intl.formatMessage({ id: "ui.fields.phone" })}
            component={InputPhone}
          />
        </div>
      </div>
      <Button type="submit" showLoader={isSubmitting}>
        {intl.formatMessage({ id: "ui.actions.continue" })}
      </Button>
    </form>
  );
}

export default compose(
  injectIntl,
  withFormik({
    displayName: "requestRestorePassword",

    mapPropsToValues: () => ({
      phone: ""
    }),

    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),

    handleSubmit: (values, formikBag) => {
      formikBag.props.onRequestRestore(values, formikBag);
    }
  })
)(RequestRestore);
