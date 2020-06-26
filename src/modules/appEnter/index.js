import produce from "immer";
import { takeLatest, put, all, call, select, take } from "redux-saga/effects";

import logger from "services/logger";
import LangModule, { types as langTypes } from "modules/lang";
import AppDataModule, { types as appDataTypes } from "modules/appData";
import AccountModule, { types as accountTypes } from "modules/account";
import EventsModule from "modules/events";
import Api from "services/api";

const initialState = {
  isLoading: true,
  isLoaded: false
};

const INIT = "APP_ENTER/INIT";
const INIT_BEGIN = "APP_ENTER/INIT_BEGIN";
const INIT_END = "APP_ENTER/INIT_END";

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case INIT_BEGIN:
        draft.isLoading = true;
        draft.isLoaded = false;
        break;
      case INIT_END:
        draft.isLoading = false;
        draft.isLoaded = true;
        break;
    }
  });

const init = () => ({ type: INIT });

function* initAppEffect(action) {
  yield put({ type: INIT_BEGIN });

  try {
    const state = yield select();

    yield call(Api.setAuthToken, state.auth.token);
    yield call(EventsModule.init.bind(EventsModule), state.auth.token);

    yield all([
      put(LangModule.setActive(state.lang.locale, true)),
      put(AccountModule.getAccount())
    ]);

    // wait for responses
    yield all([
      take(langTypes.SET_ACTIVE_SUCCESS),
      take([
        accountTypes.GET_ACCOUNT_SUCCESS,
        accountTypes.GET_ACCOUNT_FAILURE
      ]),
      take(appDataTypes.GET_LIST_SUCCESS)
    ]);
  } catch (error) {
    logger(error);
  } finally {
    yield put({ type: INIT_END });
  }
}

function* initAppWatcher() {
  yield takeLatest(INIT, initAppEffect);
}

export { reducer, initAppWatcher as sagas };
export default {
  init
};
