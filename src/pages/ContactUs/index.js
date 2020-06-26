import { compose } from "recompose";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { injectIntl } from "react-intl";

import pageLayout from "HOC/pageLayout";
import Yup from "services/Yup";
import ApiService from "services/api/ApiService";
import NotificationsModule from "modules/notifications";
import ContactUs from "./ContactUs";

export default compose(
  pageLayout(),
  injectIntl,
  connect(null, {
    notify: NotificationsModule.notify
  }),
  withFormik({
    displayName: "feedback",

    mapPropsToValues: props => ({
      name: "",
      email: "",
      message: ""
    }),

    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      message: Yup.string()
        .min(10)
        .max(2000)
        .required()
    }),

    handleSubmit: async (values, formikBag) => {
      const { intl, notify } = formikBag.props;
      formikBag.setSubmitting(true);

      try {
        await ApiService.sendFeedback(values);
        notify({
          type: "success",
          view: "window",
          message: intl.formatMessage({
            id: "ui.notifications.success.feedback"
          }),
          onAfterClose: formikBag.resetForm
        });
      } catch (error) {
        if (error.type === "VALIDATION") {
          formikBag.setErrors(error.data);
        }
      } finally {
        formikBag.setSubmitting(false);
      }
    }
  })
)(ContactUs);
