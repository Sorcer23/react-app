import React from "react";
import { compose } from "recompose";
import { withFormik, Field } from "formik";
import { injectIntl, FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import ApiService from "services/api";
import Yup from "services/Yup";
import NotificationsModule from "modules/notifications";
import Modal from "components/modals/Modal";
import Input from "components/form/Input";
import Button from "components/Button";

function ChangePasswordForm(props) {
  const { intl } = props;

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className="popup popup--xs popup--form">
        <div className="popup__head">
          <div className="popup__title">
            {intl.formatMessage({ id: "ui.actions.change_password" })}
          </div>
        </div>
        <form className="popup__body" onSubmit={props.handleSubmit}>
          <div className="row">
            <div className="col-12">
              <Field
                name="oldPassword"
                type="password"
                placeholder={intl.formatMessage({
                  id: "ui.fields.current_password"
                })}
                component={Input}
              />
            </div>
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
            <div className="col-12">
              <Button type="submit" width="100" showLoader={props.isSubmitting}>
                {intl.formatMessage({ id: "ui.actions.save" })}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default compose(
  injectIntl,
  connect(null, {
    notify: NotificationsModule.notify
  }),
  withFormik({
    displayName: "changePasswordForm",

    mapPropsToValues: props => ({
      oldPassword: "",
      password: "",
      passwordRepeat: ""
    }),

    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(9)
        .max(15),
      passwordRepeat: Yup.string()
        .required()
        .min(9)
        .max(15)
    }),

    handleSubmit: async (values, formikBag) => {
      formikBag.setSubmitting(true);
      try {
        await ApiService.changePassword(values);
        formikBag.props.onRequestClose();
        formikBag.props.notify({
          type: "success",
          view: "window",
          message: (
            <FormattedMessage id="ui.notifications.success.password_change" />
          )
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
)(ChangePasswordForm);
