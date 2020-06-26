import React from "react";
import {
  takeLeading,
  select,
  call,
  put,
  all,
  take,
  race
} from "redux-saga/effects";
import { FormattedMessage } from "react-intl";
import store from "store";

import Api from "services/api/ApiService";
import ROUTES from "config/routes";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import AppDataModule from "modules/appData";
import FormModule from "modules/form";
import NotificationsModule from "modules/notifications";
import MultiLangContent from "components/MultiLangContent";
import actions from "./actions";
import types from "./types";

function* getProductsEffect(action) {
  yield put({ type: types.GET_PRODUCTS_REQUEST });

  try {
    const { list } = yield call(Api.getProviderProducts);
    yield put({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: { products: list }
    });
  } catch (error) {
    yield put({ type: types.GET_PRODUCTS_FAILURE });
    logger(error);
  }
}

function* getProductToEditEffect(action) {
  yield put({ type: types.GET_PRODUCT_TO_EDIT_REQUEST });

  try {
    const { product } = yield call(Api.getProviderProduct, action.payload.id);
    yield put({
      type: types.GET_PRODUCT_TO_EDIT_SUCCESS,
      payload: { product }
    });
  } catch (error) {
    yield put({ type: types.GET_PRODUCT_TO_EDIT_FAILURE });
    logger(error);
  }
}

function* postProductEffect(action) {
  yield put(FormModule.submitRequest("postProduct"));
  yield put({ type: types.POST_PRODUCT_REQUEST });

  try {
    const { values, hideMessage } = action.payload;
    const isUpdate = values.id != null;

    const { product } = isUpdate
      ? yield call(Api.updateProviderProduct, values)
      : yield call(Api.addProviderProduct, values);

    yield put({ type: types.POST_PRODUCT_SUCCESS, payload: { product } });
    yield put(FormModule.submitSuccess("postProduct"));

    if (!hideMessage) {
      yield put(
        NotificationsModule.notify({
          type: "success",
          view: "window",
          message: (
            <FormattedMessage
              id={
                isUpdate
                  ? "ui.notifications.success.product_update"
                  : "ui.notifications.success.product_add"
              }
              values={{ name: <MultiLangContent text={product.title} /> }}
            />
          ),
          okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
          onConfirm: () => history.push(ROUTES.providerProducts)
        })
      );
    }
  } catch (error) {
    yield put({ type: types.POST_PRODUCT_FAILURE });
    yield put(FormModule.submitFailure("postProduct", error));
    logger(error);
  }
}

function* requestPublishEffect(action) {
  yield put({ type: types.REQUEST_PUBLISH_REQUEST });

  yield put(actions.postProduct(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_PRODUCT_FAILURE),
    saveSuccess: take(types.POST_PRODUCT_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    return;
  }

  try {
    const { id } = saveSuccess.payload.product;
    yield call(Api.requestProductPublish, id);
    yield put({ type: types.REQUEST_PUBLISH_SUCCESS });
    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: (
          <FormattedMessage
            id="ui.notifications.success.product_request_publish"
            values={{ name: saveSuccess.payload.product.title }}
          />
        ),
        okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
        onConfirm: () => history.push(ROUTES.providerProducts)
      })
    );
  } catch (error) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    logger(error);
  }
}

function* showPreview(action) {
  yield put({ type: types.SHOW_PREVIEW_REQUEST });

  yield put(actions.postProduct(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_PRODUCT_FAILURE),
    saveSuccess: take(types.POST_PRODUCT_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.SHOW_PREVIEW_FAILURE });
    return;
  }

  yield put({ type: types.SHOW_PREVIEW_SUCCESS });

  window.open(
    `${ROUTES.providerProductPreview}/${saveSuccess.payload.product.id}`
  );
}

function* deleteProductEffect(action) {
  yield put({ type: types.DELETE_PRODUCT });

  try {
    const { id } = action.payload;
    yield call(Api.deleteProviderProduct, id);

    yield put({ type: types.DELETE_PRODUCT_SUCCESS, payload: { id } });

    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: (
          <FormattedMessage id="ui.notifications.success.product_delete" />
        )
      })
    );
  } catch (error) {
    yield put({ type: types.DELETE_PRODUCT_FAILURE });
    logger(error);
  }
}

export default function* accountWatchers() {
  yield all([
    takeLeading(types.GET_PRODUCTS, getProductsEffect),
    takeLeading(types.POST_PRODUCT, postProductEffect),
    takeLeading(types.DELETE_PRODUCT, deleteProductEffect),
    takeLeading(types.REQUEST_PUBLISH, requestPublishEffect),
    takeLeading(types.GET_PRODUCT_TO_EDIT, getProductToEditEffect),
    takeLeading(types.SHOW_PREVIEW, showPreview)
  ]);
}
