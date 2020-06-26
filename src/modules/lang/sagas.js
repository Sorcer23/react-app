import { takeLatest, select, call, put } from "redux-saga/effects";

import Api from "services/api/ApiService";
import CommonModule from "modules/common";
import AppDataModule, { types as appDataTypes } from "modules/appData";
import logger from "services/logger";
import actions from "./actions";
import types from "./types";

function* setLangEffect(action) {
  const state = yield select();

  const { version: currentVersion, locale } = state.lang;
  const nextLocale = action.payload.value;

  yield put({ type: types.SET_ACTIVE_REQUEST });
  yield put(CommonModule.startPageLoading());

  try {
    const latestVersion = yield call(Api.getDictionaryVersion);

    if (action.payload.isInit || locale !== nextLocale) {
      yield call(Api.setDictionaryLang, nextLocale);

      yield put(AppDataModule.getList());

      yield put(actions.setDictionaryVersion(latestVersion));
      const dictionary = yield call(Api.getDictionaryData, nextLocale);
      yield put(actions.setDictionaryData(dictionary));
      // if (currentVersion < latestVersion) {}
    }

    if (nextLocale === "ar") {
      document.body.classList.add("dir-rtl");
    } else {
      document.body.classList.remove("dir-rtl");
    }

    yield put({
      type: types.SET_ACTIVE_SUCCESS,
      payload: { value: nextLocale }
    });
  } catch (error) {
    logger(error);
    yield put({ type: types.SET_ACTIVE_FAILURE });
  } finally {
    yield put(CommonModule.finishPageLoading());
  }
}

function* changeLangWatcher() {
  yield takeLatest(types.SET_ACTIVE, setLangEffect);
}

export default changeLangWatcher;
