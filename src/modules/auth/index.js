import produce from "immer";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import types from "./actionTypes";
import actions from "./actions";
import sagas from "./sagas";

const initialState = {
  isAuth: false,
  token: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.INIT_USER_SUCCESS:
        draft.isAuth = true;
        draft.token = payload.token;
        break;

      case types.RESET:
        return initialState;
    }
  });

const persistedReducer = persistReducer(
  {
    key: "auth",
    storage: persistStorage,
    whitelist: ["token", "isAuth"]
  },
  reducer
);

export { types, persistedReducer as reducer, sagas };
export default {
  ...actions
};
