import React from "react";
import { compose, withHandlers, withReducer, withState } from "recompose";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";

import withModal from "HOC/withModal";
import Yup from "services/Yup";
import history from "services/history";
import ApiService from "services/api/ApiService";
import NotificationsModule from "modules/notifications";
import passNotAuthUser from "HOC/passNotAuthUser";
import ROUTES from "config/routes";
import RestorePassword from "./RestorePassword";

export default compose(
  passNotAuthUser,
  connect(null, {
    notify: NotificationsModule.notify
  }),
  withModal("verifyPhone"),
  // oneOf(['request', 'verify', 'setPassword',])
  withState("restoreStep", "setRestoreStep", "request"),
  withReducer(
    "restoreData",
    "dispatch",
    (state, action) => {
      const { payload } = action;

      switch (action.type) {
        case "SET_VALUES": {
          return {
            ...state,
            ...payload.values
          };
        }

        default:
          return state;
      }
    },
    {
      phone: "",
      pin: ""
    }
  ),
  withHandlers({
    handleRequestRestore: props => async (values, formikBag) => {
      try {
        const { success } = await ApiService.restorePasswordRequest(
          values.phone
        );
        if (success) {
          props.dispatch({ type: "SET_VALUES", payload: { values } });
          props.setRestoreStep("verify");
          props.openModal("verifyPhone");
        }
      } catch (error) {
        if (error.type === "VALIDATION") {
          formikBag.setErrors(error.data);
        }
      } finally {
        formikBag.setSubmitting(false);
      }
    },
    handleVerify: props => async (values, formikBag) => {
      try {
        formikBag.setSubmitting(true);
        const { success } = await ApiService.restorePasswordVerify(
          props.restoreData.phone,
          values.pin
        );
        if (success) {
          props.dispatch({ type: "SET_VALUES", payload: { values } });
          props.closeModal("verifyPhone");
          props.setRestoreStep("setPassword");
        }
      } catch (error) {
        if (error.type === "VALIDATION") {
          formikBag.setErrors(error.data);
        }
      } finally {
        formikBag.setSubmitting(false);
      }
    },
    handleSetPassword: props => async (values, formikBag) => {
      try {
        formikBag.setSubmitting(true);
        const { success } = await ApiService.restorePasswordProcess({
          ...props.restoreData,
          ...values
        });
        if (success) {
          props.notify({
            type: "success",
            view: "window",
            message: (
              <FormattedMessage id="ui.notifications.success.password_change" />
            ),
            onAfterClose: () => {
              history.push({ pathname: ROUTES.signin });
            }
          });
        }
      } catch (error) {
        if (error.type === "VALIDATION") {
          formikBag.setErrors(error.data);
        }
      } finally {
        formikBag.setSubmitting(false);
      }
    }
  }),
  injectIntl
)(RestorePassword);
