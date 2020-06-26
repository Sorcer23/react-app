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

function* getPostsEffect(action) {
  yield put({ type: types.GET_POSTS_REQUEST });

  try {
    const { list } = yield call(Api.getProviderPosts);
    yield put({ type: types.GET_POSTS_SUCCESS, payload: { posts: list } });
  } catch (error) {
    yield put({ type: types.GET_POSTS_FAILURE });
    logger(error);
  }
}

function* getPostToEdit(action) {
  yield put({ type: types.GET_POST_TO_EDIT_REQUEST });

  try {
    const { post } = yield call(Api.getProviderPost, action.payload.id);
    yield put({ type: types.GET_POST_TO_EDIT_SUCCESS, payload: { post } });
  } catch (error) {
    yield put({ type: types.GET_POST_TO_EDIT_FAILURE });
    logger(error);
  }
}

function* postPostEffect(action) {
  yield put(FormModule.submitRequest("postPost"));
  yield put({ type: types.POST_POST_REQUEST });

  try {
    const { values, hideMessage } = action.payload;
    const isUpdate = values.id != null;

    const { post } = isUpdate
      ? yield call(Api.updateProviderPost, values)
      : yield call(Api.addProviderPost, values);

    yield put({ type: types.POST_POST_SUCCESS, payload: { post } });
    yield put(FormModule.submitSuccess("postPost"));

    if (!hideMessage) {
      yield put(
        NotificationsModule.notify({
          type: "success",
          view: "window",
          message: (
            <FormattedMessage
              id={
                isUpdate
                  ? "ui.notifications.success.post_update"
                  : "ui.notifications.success.post_add"
              }
              values={{ name: <MultiLangContent text={post.title} /> }}
            />
          ),
          okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
          onConfirm: () => history.push(ROUTES.providerPosts)
        })
      );
    }
  } catch (error) {
    yield put({ type: types.POST_POST_FAILURE });
    yield put(FormModule.submitFailure("postPost", error));
    logger(error);
  }
}

function* requestPublishEffect(action) {
  yield put({ type: types.REQUEST_PUBLISH_REQUEST });

  yield put(actions.postPost(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_POST_FAILURE),
    saveSuccess: take(types.POST_POST_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    return;
  }

  try {
    const { id } = saveSuccess.payload.post;
    yield call(Api.requestPostPublish, id);
    yield put({ type: types.REQUEST_PUBLISH_SUCCESS });
    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: (
          <FormattedMessage
            id="ui.notifications.success.post_request_publish"
            values={{ name: saveSuccess.payload.post.title }}
          />
        ),
        okLabel: <FormattedMessage id="ui.actions.go_to_list" />,
        onConfirm: () => history.push(ROUTES.providerPosts)
      })
    );
  } catch (error) {
    yield put({ type: types.REQUEST_PUBLISH_FAILURE });
    logger(error);
  }
}

function* showPreview(action) {
  yield put({ type: types.SHOW_PREVIEW_REQUEST });

  yield put(actions.postPost(action.payload.values, true));

  const { saveFailure, saveSuccess } = yield race({
    saveFailure: take(types.POST_POST_FAILURE),
    saveSuccess: take(types.POST_POST_SUCCESS)
  });

  if (saveFailure) {
    yield put({ type: types.SHOW_PREVIEW_FAILURE });
    return;
  }

  yield put({ type: types.SHOW_PREVIEW_SUCCESS });

  window.open(`${ROUTES.providerPostPreview}/${saveSuccess.payload.post.id}`);
}

function* deletePostEffect(action) {
  yield put({ type: types.DELETE_POST });

  try {
    const { id } = action.payload;
    yield call(Api.deleteProviderPost, id);

    yield put({ type: types.DELETE_POST_SUCCESS, payload: { id } });

    yield put(
      NotificationsModule.notify({
        type: "success",
        view: "window",
        message: <FormattedMessage id="ui.notifications.success.post_delete" />
      })
    );
  } catch (error) {
    yield put({ type: types.DELETE_POST_FAILURE });
    logger(error);
  }
}

function* getPostsWatcher() {
  yield takeLeading(types.GET_POSTS, getPostsEffect);
}

function* postPostWatcher() {
  yield takeLeading(types.POST_POST, postPostEffect);
}

function* deletePostWatcher() {
  yield takeLeading(types.DELETE_POST, deletePostEffect);
}

function* requestPublishWatcher() {
  yield takeLeading(types.REQUEST_PUBLISH, requestPublishEffect);
}

export default function* accountWatchers() {
  yield all([
    getPostsWatcher(),
    postPostWatcher(),
    deletePostWatcher(),
    requestPublishWatcher(),
    takeLeading(types.GET_POST_TO_EDIT, getPostToEdit),
    takeLeading(types.SHOW_PREVIEW, showPreview)
  ]);
}
