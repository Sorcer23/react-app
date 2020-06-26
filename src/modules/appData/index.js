import produce from "immer";
import { takeLeading, call, put, select, delay } from "redux-saga/effects";

import Api from "services/api/ApiService";
import logger from "services/logger";
import types from "./actionTypes";

const initialState = {
  list: {}
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_LIST_SUCCESS:
        draft.list = payload.list;
        break;
    }
  });

// actions
const getList = () => ({ type: types.GET_LIST });

// sagas
function* getListWatcher() {
  yield takeLeading(types.GET_LIST, function*(action) {
    try {
      yield put({ type: types.GET_LIST_REQUEST });
      const list = yield call(Api.getAppData);
      yield put({ type: types.GET_LIST_SUCCESS, payload: { list } });
    } catch (error) {
      yield put({ type: types.GET_LIST_FAILURE });
      logger(error);
    }
  });
}

// selectors
const listSelector = state => (...names) => {
  return names.reduce((selectedData, name) => {
    const list = state.appData.list[name];

    selectedData[name] = list != null ? list : [];

    return selectedData;
  }, {});
};

export { types, reducer, getListWatcher as sagas };

export default {
  getList,
  listSelector
};
