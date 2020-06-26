import React from "react";
import { connect } from "react-redux";
import { Field } from "formik";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import { FormattedMessage } from "react-intl";

import Yup from "services/Yup";
import ModalModule from "modules/modal";
import SignUpModule from "modules/signup";
import withConnectedFormik from "HOC/withConnectedFormik";
import withResendPin from "HOC/withResendPin";
import Modal from "components/modals/Modal";
import Button from "components/Button";
import CodeInput from "components/form/CodeInput";

function ModalPhoneVerify(props) {
  const {
    timeToVerify,
    resendPin,
    hide,
    phone,
    isSubmitting,
    handleSubmit
  } = props;

  return (
    <Modal {...props} onRequestClose={hide}>
      <div className="popup otp">
        <div className="popup__head">
          <div className="popup__title">Verification</div>
        </div>
        <div className="popup__body">
          <form onSubmit={handleSubmit}>
            <div className="otp__content">
              <div className="otp__textw">
                <p>
                  {" "}
                  Verify your mobile number by entering the OTP you have
                  recieved on your registered mobile number
                </p>
                <p>{phone}</p>
                <button type="button" className="link" onClick={hide}>
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
                    <span>{timeToVerify + " "}</span>
                    <span>sec remaining</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="otp__reset"
                    onClick={resendPin}
                  >
                    Resend
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
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
      hide: ModalModule.hide,
      verifyPhone: SignUpModule.verifyPhone
    }
  ),
  withConnectedFormik({
    displayName: "verifyPhone",

    mapPropsToValues: () => {
      return {
        pin: ""
      };
    },

    validationSchema: Yup.object().shape({
      pin: Yup.string()
        .required()
        .min(4, <FormattedMessage id="ui.validation.pin_not_valid" />)
    }),

    handleSubmit: (values, formikBag) => {
      formikBag.props.verifyPhone(values.pin);
    }
  }),
  withResendPin
)(ModalPhoneVerify);
