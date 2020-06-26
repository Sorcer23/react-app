import { takeLatest, select, take, call, put, all } from "redux-saga/effects";
import {
  success as notifySuccess,
  error as notifyError
} from "react-notification-system-redux";

import Api from "services/api/ApiService";
import ROUTES from "config/routes";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import AppDataModule, { types as appDataTypes } from "modules/appData";
import FormModule from "modules/form";
import EventsModule from "modules/events";
import AccountModule, { types as accountTypes } from "modules/account";
import authActions from "./actions";
import types from "./actionTypes";

function* initUserEffect(action) {
  const { token } = action.payload;
  yield call(Api.setAuthToken, token);
  yield call(EventsModule.init.bind(EventsModule), token);
  yield put({ type: types.INIT_USER_SUCCESS, payload: { token } });
}

function* resetEffect(action) {
  EventsModule.disconnect();

  if (action.payload.withRedirect) {
    yield call(history.replace, ROUTES.signin);
  }
}

function* signinEffect(action) {
  yield put(FormModule.submitRequest("signin"));

  try {
    const { values } = action.payload;
    const { user } = yield call(Api.signin, values);

    yield put(FormModule.submitSuccess("signin"));

    yield put(authActions.initUser(user.token));
    yield take([types.INIT_USER_SUCCESS]);

    yield put(AccountModule.getAccount());
    yield take([
      accountTypes.GET_ACCOUNT_FAILURE,
      accountTypes.GET_ACCOUNT_SUCCESS
    ]);
  } catch (error) {
    yield put(FormModule.submitFailure("signin", error));
    logger(error);
  }
}

function* signinWatcher() {
  yield takeLatest(types.SIGNIN, signinEffect);
}

function* initUserWatcher() {
  yield takeLatest(types.INIT_USER, initUserEffect);
}

function* resetWatcher() {
  yield takeLatest(types.RESET, resetEffect);
}

export default function* authWatchers() {
  yield all([initUserWatcher(), resetWatcher(), signinWatcher()]);
}
