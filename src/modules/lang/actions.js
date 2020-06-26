import types from "./types";

const setActive = (value, isInit) => ({
  type: types.SET_ACTIVE,
  payload: { value, isInit }
});
const setDictionaryVersion = version => ({
  type: types.SET_DICTIONARY_VERSION,
  payload: { version }
});
const setDictionaryData = dictionary => ({
  type: types.SET_DICTIONARY_DATA,
  payload: { dictionary }
});

export default {
  setActive,
  setDictionaryVersion,
  setDictionaryData
};
