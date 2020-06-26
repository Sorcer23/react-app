import { put, call } from "redux-saga/effects";

export default function sagaApiCall(method, data) {
  return function*(action) {
    yield put({ type: `${action.type}_REQUEST` });

    try {
      const response = yield call(method.bind(null, data));

      yield put({ type: `${action.type}_SUCCESS`, data: response.data });
    } catch (error) {
      yield put({ type: `${action.type}_FAILURE`, error });
    }
  };
}
