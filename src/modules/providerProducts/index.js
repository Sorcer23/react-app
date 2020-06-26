import produce from "immer";
import { combineReducers } from "redux";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import moment from "moment";

import types from "./types";
import actions from "./actions";
import sagas from "./sagas";
import * as config from "./config";

const initialState = {
  list: [],
  isRequestPublishLoading: false,
  isPreparingPreview: false,
  editingProduct: {
    title: {
      en: "",
      ar: ""
    },
    description: {
      en: "",
      ar: ""
    },
    priceUnit: "",
    price: "",
    wasPrice: "",
    offerPrice: "",
    offerToDate: "",
    madeIn: "",
    dimensions: "",
    material: "",
    brand: "",
    delivery: false,
    categoryId: "",
    subCategoryId: "",
    recommendedSize: "",
    unitSet: "",
    deliveryDays: "",
    deliveryPrice: "",
    deliveryDescription: {
      en: "",
      ar: ""
    },
    deliveryOption: "",
    products: [],
    colors: [],
    images: []
  }
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_PRODUCTS_SUCCESS: {
        draft.list = payload.products;
        break;
      }

      case types.GET_PRODUCT_TO_EDIT_SUCCESS: {
        draft.editingProduct = payload.product;
        break;
      }

      case types.RESET_EDITING_PRODUCT: {
        draft.editingProduct = initialState.editingProduct;
        break;
      }

      case types.POST_PRODUCT_SUCCESS: {
        draft.editingProduct = payload.product;
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
