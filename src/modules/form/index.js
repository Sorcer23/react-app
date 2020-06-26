import produce from "immer";
import { takeEvery, takeLatest } from "redux-saga/effects";

import FORM_NAMES from "./formNames";

const SUBMIT_REQUEST = "FORM/SUBMIT_REQUEST";
const SUBMIT_FAILURE = "FORM/SUBMIT_FAILURE";
const SUBMIT_SUCCESS = "FORM/SUBMIT_SUCCESS";

const FETCH_REQUEST = "FORM/FETCH_REQUEST";
const FETCH_FAILURE = "FORM/FETCH_FAILURE";
const FETCH_SUCCESS = "FORM/FETCH_SUCCESS";

const submitRequest = formName => ({
  type: SUBMIT_REQUEST,
  payload: { formName }
});
const submitFailure = (formName, error) => ({
  type: SUBMIT_FAILURE,
  payload: { formName, error }
});
const submitSuccess = formName => ({
  type: SUBMIT_SUCCESS,
  payload: { formName }
});

const fetchRequest = formName => ({
  type: FETCH_REQUEST,
  payload: { formName }
});
const fetchFailure = formName => ({
  type: FETCH_FAILURE,
  payload: { formName }
});
const fetchSuccess = formName => ({
  type: FETCH_SUCCESS,
  payload: { formName }
});

const initialState = {
  list: {}
};
const initialFormState = {
  isSubmitting: false,
  isFetching: false,
  isFetched: false,
  errors: {}
};
FORM_NAMES.forEach(
  formName => (initialState.list[formName] = initialFormState)
);

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case FETCH_REQUEST: {
        const form = draft.list[payload.formName];

        form.isFetching = true;
        form.isFetched = false;
        break;
      }

      case FETCH_FAILURE: {
        const form = draft.list[payload.formName];

        form.isFetching = false;
      }
      case FETCH_SUCCESS: {
        const form = draft.list[payload.formName];

        form.isFetching = false;
        form.isFetched = true;
        break;
      }

      case SUBMIT_REQUEST: {
        const form = draft.list[payload.formName];

        form.isSubmitting = true;
        form.errors = {};
        break;
      }

      case SUBMIT_FAILURE: {
        const { type, data } = payload.error;

        if (type === "VALIDATION") {
          draft.list[payload.formName].errors = data;
        }

        draft.list[payload.formName].isSubmitting = false;
        break;
      }

      case SUBMIT_SUCCESS:
        draft.list[payload.formName].isSubmitting = false;
        break;
    }
  });

export { reducer };
export default {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  submitRequest,
  submitFailure,
  submitSuccess
};
