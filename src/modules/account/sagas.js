import React from "react";
import {
  takeLeading,
  takeLatest,
  select,
  call,
  put,
  all
} from "redux-saga/effects";
import { FormattedMessage } from "react-intl";

import Api from "services/api/ApiService";
import ROUTES from "config/routes";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import AppDataModule from "modules/appData";
import FormModule from "modules/form";
import NotificationsModule from "modules/notifications";
import types from "./types";
import actions from "./actions";

function* getAccountEffect(action) {
  const state = yield select();

  if (!state.auth.isAuth) {
    yield put({ type: types.GET_ACCOUNT_FAILURE });
    return;
  }

  yield put(FormModule.fetchRequest("account"));

  try {
    const { user } = yield call(Api.getUserAccount);
    yield put(FormModule.fetchSuccess("account"));
    yield put({ type: types.GET_ACCOUNT_SUCCESS, payload: { user } });
  } catch (error) {
    yield put(FormModule.fetchFailure("account"));
    yield put({ type: types.GET_ACCOUNT_FAILURE });
    logger(error);
  }
}

function* postAccountEffect(action) {
  yield put(FormModule.submitRequest("account"));

  try {
    const sentData = { ...action.payload.values };
    delete sentData.phone;
    delete sentData.email;
    const { user } = yield call(Api.postUserAccount, sentData);

    yield put({ type: types.POST_ACCOUNT_SUCCESS, payload: { user } });
    yield put(FormModule.submitSuccess("account"));
    yield put(
      NotificationsModule.notify({
        message: (
          <FormattedMessage id="ui.notifications.success.account_update" />
        ),
        type: "success",
        view: "window"
      })
    );
  } catch (error) {
    yield put(FormModule.submitFailure("account", error));
    logger(error);
  }
}

function* getAddressesEffect(action) {
  yield put({ type: types.GET_ADDRESSES_REQUEST });

  try {
    const { addresses } = yield call(Api.getUserAddresses);
    yield put({ type: types.GET_ADDRESSES_SUCCESS, payload: { addresses } });
  } catch (error) {
    yield put({ type: types.GET_ADDRESSES_FAILURE });
    logger(error);
  }
}

function* postAddressEffect(action) {
  yield put(FormModule.submitRequest("address"));
  yield put({ type: types.POST_ADDRESS_REQUEST });

  try {
    const { values } = action.payload;
    const isEdit = values.id != null;

    const { address } = isEdit
      ? yield call(Api.editUserAddress, values)
      : yield call(Api.addUserAddress, values);

    yield put({ type: types.POST_ADDRESS_SUCCESS, payload: { address } });

    yield put(actions.getAddresses());

    yield put(FormModule.submitSuccess("address"));

    yield put(
      NotificationsModule.notify({
        message: (
          <FormattedMessage
            id={
              isEdit
                ? "ui.notifications.success.address_edit"
                : "ui.notifications.success.address_add"
            }
          />
        ),
        type: "success",
        view: "window"
      })
    );
  } catch (error) {
    yield put({ type: types.POST_ADDRESS_FAILURE });
    yield put(FormModule.submitFailure("address", error));
    logger(error);
  }
}

function* setActiveAddressEffect(action) {
  yield put({ type: types.SET_ACTIVE_REQUEST });

  try {
    const { id } = action.payload;
    yield call(Api.setActiveAddress, id);
    yield put({ type: types.SET_ACTIVE_SUCCESS, payload: { id } });
    yield put(
      NotificationsModule.notify({
        message: (
          <FormattedMessage id="ui.notifications.success.address_change_active" />
        ),
        type: "success",
        view: "window"
      })
    );
  } catch (error) {
    yield put({ type: types.SET_ACTIVE_FAILURE });
    logger(error);
  }
}

function* deleteAddressEffect(action) {
  yield put({ type: types.DELETE_ADDRESS_REQUEST });

  try {
    const { id } = action.payload;
    yield call(Api.deleteUserAddress, id);

    yield put({ type: types.DELETE_ADDRESS_SUCCESS, payload: { id } });
  } catch (error) {
    yield put({ type: types.DELETE_ADDRESS_FAILURE });
    logger(error);
  }
}

function* getAccountWatcher() {
  yield takeLeading(types.GET_ACCOUNT, getAccountEffect);
}

function* postAccountWatcher() {
  yield takeLeading(types.POST_ACCOUNT, postAccountEffect);
}

function* getAddressesWatcher() {
  yield takeLeading(types.GET_ADDRESSES, getAddressesEffect);
}

function* postAddressWatcher() {
  yield takeLeading(types.POST_ADDRESS, postAddressEffect);
}

function* setActiveAddressWatcher() {
  yield takeLeading(types.SET_ACTIVE, setActiveAddressEffect);
}

function* deleteAddressWatcher() {
  yield takeLeading(types.DELETE_ADDRESS, deleteAddressEffect);
}

export default function* accountWatchers() {
  yield all([
    getAccountWatcher(),
    postAccountWatcher(),
    getAddressesWatcher(),
    postAddressWatcher(),
    setActiveAddressWatcher(),
    deleteAddressWatcher()
  ]);
}
