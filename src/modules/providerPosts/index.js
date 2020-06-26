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
  editingPost: {
    title: {
      en: "",
      ar: ""
    },
    description: {
      en: "",
      ar: ""
    },
    fullDescription: {
      en: "",
      ar: ""
    },
    spaceTypeId: "",
    styleId: "",
    budgetId: "",
    products: [],
    services: [],
    images: []
  }
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_POSTS_SUCCESS: {
        draft.list = payload.posts;
        break;
      }

      case types.GET_POST_TO_EDIT_SUCCESS: {
        draft.editingPost = payload.post;
        break;
      }

      case types.RESET_EDITING_POST: {
        draft.editingPost = initialState.editingPost;
        break;
      }

      case types.POST_POST_SUCCESS: {
        draft.editingPost = payload.post;
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
