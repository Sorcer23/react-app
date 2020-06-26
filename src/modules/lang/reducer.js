import produce from "immer";
import persistStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import flatten from "flat";

import types from "./types";
import { DEFAULT_LANG } from "config";

const initialState = {
  locale: DEFAULT_LANG,
  version: 0,
  list: [
    {
      value: "en",
      label: "English"
    },
    {
      value: "ar",
      label: "Arabic"
    }
  ],
  dictionary: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.SET_ACTIVE_SUCCESS:
        draft.locale = payload.value;
        break;

      case types.SET_DICTIONARY_VERSION:
        draft.version = payload.version;
        break;

      case types.SET_DICTIONARY_DATA:
        draft.dictionary = flatten(payload.dictionary);
        break;
    }
  });

export default persistReducer(
  {
    key: "lang",
    storage: persistStorage,
    whitelist: ["locale", "version", "dictionary"]
  },
  reducer
);
