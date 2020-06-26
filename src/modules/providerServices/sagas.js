import React from "react";
import {
  takeLeading,
  select,
  take,
  call,
  put,
  all,
  race
} from "redux-saga/effects";
import {
  success as notifySuccess,
  error as notifyError
} from "react-notification-system-redux";
import { FormattedMessage } from "react-intl";

import Api from "services/api/ApiService";
import ROUTES from "config/routes";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import AppDataModule from "modules/appData";
import NotificationsModule from "modules/notifications";
import FormModule from "modules/form";
import MultiLangContent from "components/MultiLangContent";
import actions from "./actions";
import types from "./types";

function* getServicesEffect(action) {
  yield put({ type: types.GET_SERVICES_REQUEST });

  try {
    const { list } = yield call(Api.getProviderServices);
    yield put({
      type: types.GET_SERVICES_SUCCESS,
      payload: { services: list }
    });
  } catch (error) {
    yield put({ type: types.GET_SERVICES_FAILURE });
    logger(error);
  }
}

function* getServiceToEdit(action) {
  yield put({ type: types.GET_SERVICE_TO_EDIT_REQUEST });

  try {
    const { service } = yield call(Api.getProviderService, action.payload.id);
    yield put({
      type: types.GET_SERVICE_TO_EDIT_SUCCESS,
      payload: { service }
    });
  } catch (error) {
    yield put({ type: types.GET_SERVICE_TO_EDIT_FAILURE });
    logger(error);
  }
}

function* postServiceEffect(action) {
  yield put(FormModule.submitRequest("postService"));
  yield put({ type: types.POST_SERVICE_REQUEST });

  try {
    const { values, hideMessage } = action.payload;
    const isUpdate = values.id != null;

    const { service } = isUpdate
      ? yield call(Api.updateProviderService, values)
      : yield call(Api.addProviderService, values);

    yield put({ type: types.POST_SERVICE_SUCCESS, payload: { service } });
    yield put(FormModule.submitSuccess("postService"));

    if (!hideMessage) {
      yield put(
        NotificationsModule.notify({
          type: "success",
          view: "window",
          message: (
            <FormattedMessage
              id={
                isUpdate
                  ? "ui.notifications.success.service_update"
                  : "ui.notifications.success.service_add"
              }
              values={{ name: <MultiLangContent text={service.title} /> }}
            />
          ),
          okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
          onConfirm: () => history.push(ROUTES.providerServices)
        })
      );
    }
  } catch (error) {
    yield put({ type: types.POST_SERVICE_FAILURE });
    yield put(FormModule.submitFailure("postService", error));
    logger(error);
  }
}

function* requestPublishEffect(action) {
  yield put({ type: types.REQUEST_PUBLISH_REQUEST });

  yield put(actions.postService(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_SERVICE_FAILURE),
    saveSuccess: take(types.POST_SERVICE_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    return;
  }

  try {
    const { id } = saveSuccess.payload.service;
    yield call(Api.requestServicePublish, id);
    yield put({ type: types.REQUEST_PUBLISH_SUCCESS });
    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: (
          <FormattedMessage
            id="ui.notifications.success.service_request_publish"
            values={{ name: saveSuccess.payload.service.title }}
          />
        ),
        okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
        onConfirm: () => history.push(ROUTES.providerServices)
      })
    );
  } catch (error) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    logger(error);
  }
}

function* showPreview(action) {
  yield put({ type: types.SHOW_PREVIEW_REQUEST });

  yield put(actions.postService(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_SERVICE_FAILURE),
    saveSuccess: take(types.POST_SERVICE_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.SHOW_PREVIEW_FAILURE });
    return;
  }

  yield put({ type: types.SHOW_PREVIEW_SUCCESS });

  window.open(
    `${ROUTES.providerServicePreview}/${saveSuccess.payload.service.id}`
  );
}

function* deleteServiceEffect(action) {
  yield put({ type: types.DELETE_SERVICE });

  try {
    const { id } = action.payload;
    yield call(Api.deleteProviderService, id);

    yield put({ type: types.DELETE_SERVICE_SUCCESS, payload: { id } });

    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: (
          <FormattedMessage id="ui.notifications.success.service_delete" />
        )
      })
    );
  } catch (error) {
    yield put({ type: types.DELETE_SERVICE_FAILURE });
    logger(error);
  }
}

function* getServicesWatcher() {
  yield takeLeading(types.GET_SERVICES, getServicesEffect);
}

function* postServiceWatcher() {
  yield takeLeading(types.POST_SERVICE, postServiceEffect);
}

function* deleteServiceWatcher() {
  yield takeLeading(types.DELETE_SERVICE, deleteServiceEffect);
}

function* requestPublishWatcher() {
  yield takeLeading(types.REQUEST_PUBLISH, requestPublishEffect);
}

export default function* providerServicesWatchers() {
  yield all([
    getServicesWatcher(),
    postServiceWatcher(),
    deleteServiceWatcher(),
    requestPublishWatcher(),
    takeLeading(types.GET_SERVICE_TO_EDIT, getServiceToEdit),
    takeLeading(types.SHOW_PREVIEW, showPreview)
  ]);
}
