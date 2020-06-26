import produce from "immer";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { signupSteps } from "./config";
import { types as authTypes } from "modules/auth";
import types from "./actionTypes";

const initialState = {
  step: signupSteps.registerPhone,
  inProgress: false,
  token: "",
  phone: "",
  email: "",
  password: "",
  firstName: "",
  lastName: ""
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.CHANGE_STEP:
        draft.step = payload.step;
        break;

      case types.SET_FIELD:
        draft[payload.name] = payload.value;
        break;

      case types.REGISTER_PHONE_SUCCESS:
        draft.phone = payload.phone;
        break;

      case types.VERIFY_PHONE_SUCCESS:
        draft.inProgress = true;
        draft.token = payload.token;
        break;

      case types.REGISTER_EMAIL:
        draft.email = payload.email;
        break;

      case types.FINISH_SIGNUP_SUCCESS:
        return initialState;

      case authTypes.RESET:
        return initialState;
    }
  });

export default persistReducer(
  {
    key: "signup",
    storage: persistStorage,
    whitelist: ["inProgress", "phone", "password"]
  },
  reducer
);
