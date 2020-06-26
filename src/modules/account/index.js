import produce from "immer";
import { combineReducers } from "redux";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import types from "./types";
import { types as authTypes } from "modules/auth";
import actions from "./actions";
import * as selectors from "./selectors";
import sagas from "./sagas";
import * as config from "./config";

const initialUser = {
  id: null,
  phone: "",
  firstName: {
    en: "",
    ar: ""
  },
  lastName: {
    en: "",
    ar: ""
  },
  email: "",
  avatar: "",
  gender: 0,
  dateOfBirth: "",
  occupation: "",
  whySinan: "",
  aboutSinan: "",
  subsriptionEmail: false,
  subsriptionSms: false
};

const initialAddresses = {
  list: [],
  editingAddress: {
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    // landmark: '',
    aptNumber: "",
    selected: false,
    lat: "",
    lng: ""
  }
};

const user = (state = initialUser, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_ACCOUNT_SUCCESS:
      case types.POST_ACCOUNT_SUCCESS: {
        const { user } = payload;
        for (const prop in user) draft[prop] = user[prop];
        break;
      }

      case authTypes.RESET: {
        return initialUser;
      }
    }
  });

const addresses = (state = initialAddresses, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_ADDRESSES_SUCCESS: {
        const { addresses } = payload;
        draft.list = addresses;
        break;
      }

      case types.SAVE_ADDRESS_FROM_MAP: {
        draft.editingAddress = {
          ...state.editingAddress,
          ...payload.place
        };
        break;
      }

      case types.POST_ADDRESS_SUCCESS: {
        draft.editingAddress = initialAddresses.editingAddress;
        break;
      }

      case types.EDIT_ADDRESS: {
        draft.editingAddress = state.list.find(
          address => address.id === payload.id
        );
        break;
      }

      case types.SET_ACTIVE_SUCCESS: {
        const { id } = payload;
        state.list.forEach((address, i) => {
          if (address.id === id) {
            draft.list[i].selected = true;
            return;
          }

          if (address.selected) {
            draft.list[i].selected = false;
            return;
          }
        });
        break;
      }

      case types.DELETE_ADDRESS_SUCCESS: {
        const { id } = payload;
        draft.list = state.list.filter(address => address.id !== id);
        break;
      }
    }
  });

const reducer = combineReducers({
  user,
  addresses
});

export { config, types, reducer, sagas, selectors };
export default {
  ...actions
};
