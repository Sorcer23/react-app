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
import AppDataModule from "modules/appData";
import FormModule from "modules/form";
import types from "./types";

function* requestToBeProviderEffect(action) {
  yield call(history.push, {
    pathname: ROUTES.account,
    state: { enableProviderForm: true }
  });
}

function* getAccountEffect(action) {
  yield put(FormModule.fetchRequest("account"));
  try {
    const { serviceProvider } = yield call(Api.getProviderAccount);
    yield put(FormModule.fetchSuccess("account"));
    yield put({
      type: types.GET_ACCOUNT_SUCCESS,
      payload: { provider: serviceProvider }
    });
  } catch (error) {
    yield put(FormModule.fetchFailure("account"));
    logger(error);
  }
}

function* postAccountEffect(action) {
  yield put(FormModule.submitRequest("account"));

  try {
    const sentData = { ...action.payload.values };
    delete sentData.phone;
    const { serviceProvider } = yield call(Api.postProviderAccount, sentData);

    yield put({
      type: types.POST_ACCOUNT_SUCCESS,
      payload: { provider: serviceProvider }
    });
    yield put(FormModule.submitSuccess("account"));
  } catch (error) {
    yield put(FormModule.submitFailure("account", error));
    logger(error);
  }
}

function* requestToBeProviderWatcher() {
  yield takeLatest(types.REQUEST_TO_BE_PROVIDER, requestToBeProviderEffect);
}

function* getAccountWatcher() {
  yield takeLatest(types.GET_ACCOUNT, getAccountEffect);
}

function* postAccountWatcher() {
  yield takeLatest(types.POST_ACCOUNT, postAccountEffect);
}

export default function* accountWatchers() {
  yield all([
    requestToBeProviderWatcher(),
    getAccountWatcher(),
    postAccountWatcher()
  ]);
}
