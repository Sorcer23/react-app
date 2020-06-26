import types from "./actionTypes";

const registerPhone = phone => ({
  type: types.REGISTER_PHONE,
  payload: { phone }
});
const verifyPhone = pin => ({ type: types.VERIFY_PHONE, payload: { pin } });
const registerEmail = email => ({
  type: types.REGISTER_EMAIL,
  payload: { email }
});
const finishSignup = () => ({ type: types.FINISH_SIGNUP });

const changeStep = step => ({ type: types.CHANGE_STEP, payload: { step } });
const setField = (name, value) => ({
  type: types.SET_FIELD,
  payload: { name, value }
});

export default {
  registerPhone,
  verifyPhone,
  registerEmail,
  changeStep,
  setField,
  finishSignup
};
