import produce from "immer";
import { combineReducers } from "redux";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import types from "./types";
import actions from "./actions";
import sagas from "./sagas";
import * as config from "./config";

const initialState = {
  list: [],
  isRequestPublishLoading: false,
  isPreparingPreview: false,
  editingService: {
    title: {
      en: "",
      ar: ""
    },
    description: {
      en: "",
      ar: ""
    },
    serviceTypeId: "",
    serviceCategoryId: "",
    priceUnit: "",
    price: "",
    images: [],
    colors: []
  }
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_SERVICES_SUCCESS: {
        draft.list = payload.services;
        break;
      }

      case types.GET_SERVICE_TO_EDIT_SUCCESS: {
        draft.editingService = payload.service;
        break;
      }

      case types.RESET_EDITING_SERVICE: {
        draft.editingService = initialState.editingService;
        break;
      }

      case types.POST_SERVICE_SUCCESS: {
        draft.editingService = payload.service;
        break;
      }

      case types.REQUEST_PUBLISH_REQUEST: {
        draft.isRequestPublishLoading = true;
        break;
      }

      case types.REQUEST_PUBLISH_SUCCESS:
      case types.REQUEST_PUBLISH_FAILURE: {
        draft.isRequestPublishLoading = false;
        break;
      }

      case types.SHOW_PREVIEW_REQUEST: {
        draft.isPreparingPreview = true;
        break;
      }

      case types.SHOW_PREVIEW_SUCCESS:
      case types.SHOW_PREVIEW_FAILURE: {
        draft.isPreparingPreview = false;
        break;
      }
    }
  });

export { config, types, reducer, sagas };
export default {
  ...actions
};
