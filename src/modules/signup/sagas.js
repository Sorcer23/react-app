import { takeLatest, select, call, put, all } from "redux-saga/effects";
import {
  success as notifySuccess,
  error as notifyError
} from "react-notification-system-redux";

import Api from "services/api/ApiService";
import ROUTES from "config/routes";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import FormModule from "modules/form";
import AuthModal from "modules/auth";
import signupActions from "./actions";
import types from "./actionTypes";
import { signupSteps } from "./config";

function* registerPhoneEffect(action) {
  yield put(FormModule.submitRequest("registerPhone"));
  yield put({ type: types.REGISTER_PHONE_REQUEST });

  try {
    yield call(Api.registerPhone, action.payload.phone);

    yield put(FormModule.submitSuccess("registerPhone"));
    yield put({
      type: types.REGISTER_PHONE_SUCCESS,
      payload: { phone: action.payload.phone }
    });
    yield put(ModalModule.show({ name: MODAL_NAMES.phoneVerify }));
  } catch (error) {
    yield put(FormModule.submitFailure("registerPhone", error));
    yield put({ type: types.REGISTER_PHONE_FAILURE });
    logger(error);
  }
}

function* verifyPhoneEffect(action) {
  const state = yield select();

  yield put(FormModule.submitRequest("verifyPhone"));

  try {
    const { user } = yield call(
      Api.verifyPhone,
      state.signup.phone,
      action.payload.pin
    );

    yield put(FormModule.submitSuccess("verifyPhone"));
    yield put({
      type: types.VERIFY_PHONE_SUCCESS,
      payload: { token: user.token }
    });
    yield put(ModalModule.hide());
    yield put(signupActions.changeStep(signupSteps.email));
  } catch (error) {
    yield put(FormModule.submitFailure("verifyPhone", error));
    logger(error);
  }
}

function* registerEmailEffect(action) {
  yield put(signupActions.changeStep(signupSteps.password));
}

function* finishSignupEffect(action) {
  const state = yield select();
  const { email, password, firstName, lastName, token } = state.signup;

  yield put(FormModule.submitRequest("registerName"));

  try {
    yield call(
      Api.patchUserAccount,
      {
        email,
        password,
        firstName,
        lastName
      },
      token
    );
    yield put(FormModule.submitSuccess("registerName"));
    yield put(AuthModal.initUser(token));
    yield call(history.push, ROUTES.home);
  } catch (error) {
    yield put(FormModule.submitFailure("registerName", error));
  }
}

function* registerPhoneWatcher() {
  yield takeLatest(types.REGISTER_PHONE, registerPhoneEffect);
}

function* verifyPhoneWatcher() {
  yield takeLatest(types.VERIFY_PHONE, verifyPhoneEffect);
}

function* registerEmailWatcher() {
  yield takeLatest(types.REGISTER_EMAIL, registerEmailEffect);
}

function* finishSignupWatcher() {
  yield takeLatest(types.FINISH_SIGNUP, finishSignupEffect);
}

export default function* signupWatchers() {
  yield all([
    registerPhoneWatcher(),
    verifyPhoneWatcher(),
    registerEmailWatcher(),
    finishSignupWatcher()
  ]);
}
