import produce from "immer";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { types as authTypes } from "modules/auth";
import types from "./types";
import actions from "./actions";
import sagas from "./sagas";

const initialState = {
  businessName: {
    en: "",
    ar: ""
  },
  businessIntro: {
    en: "",
    ar: ""
  },
  businessEmail: "",
  professionType: 0,
  professionalExperience: 0,
  contactNumber: "",
  altNumber: "",
  faxNumber: "",
  companyWebsite: "",
  categoryId: "",
  fbLink: "",
  scLink: "",
  instLink: "",
  twLink: "",
  services: [],
  locations: [],
  profilePic: "",
  companyPic: "",
  cr: "",
  workPermit: "",
  workSamples: []
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.GET_ACCOUNT_SUCCESS:
      case types.POST_ACCOUNT_SUCCESS: {
        const { provider } = payload;
        for (const prop in provider) draft[prop] = provider[prop];
        break;
      }

      case authTypes.RESET:
        return initialState;
    }
  });

export { types, reducer, sagas };
export default {
  ...actions
};
