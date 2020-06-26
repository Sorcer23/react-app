import React from "react";
import { connect } from "react-redux";
import { withFormik, Field } from "formik";
import { compose } from "recompose";
import { FormattedMessage } from "react-intl";

import Yup from "services/Yup";
import withResendPin from "HOC/withResendPin";
import Modal from "components/modals/Modal";
import Button from "components/Button";
import CodeInput from "components/form/CodeInput";

function ModalPhoneVerify(props) {
  const {
    timeToVerify,
    resendPin,
    phone,
    isSubmitting,
    onRequestClose,
    handleSubmit
  } = props;

  return (
    <Modal {...props}>
      <form onSubmit={handleSubmit} className="popup otp">
        <div className="popup__head">
          <div className="popup__title">Verification</div>
        </div>
        <div className="popup__body">
          <div className="otp__content">
            <div className="otp__textw">
              <p>
                {" "}
                Verify your mobile number by entering the OTP you have recieved
                on your registered mobile number
              </p>
              <p>{phone}</p>
              <button type="button" className="link" onClick={onRequestClose}>
                Edit number
              </button>
            </div>

            <Field name="pin" component={CodeInput} />

            <Button type="submit" width="100" showLoader={isSubmitting}>
              Submit
            </Button>
            <div className="otp__timer-wrap">
              {timeToVerify > 0 ? (
                <div className="otp__timer">
                  <span>{timeToVerify}</span>
                  <span>sec remaining</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="otp__reset"
                  onClick={resendPin}
                >
                  Resend
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default compose(
  withFormik({
    displayName: "verifyCode",

    mapPropsToValues: () => ({
      pin: ""
    }),

    validationSchema: Yup.object().shape({
      pin: Yup.string()
        .required()
        .min(4, <FormattedMessage id="ui.validation.pin_not_valid" />)
    }),

    handleSubmit: (values, formikBag) => {
      formikBag.props.onVerify(values, formikBag);
    }
  }),
  withResendPin
)(ModalPhoneVerify);
