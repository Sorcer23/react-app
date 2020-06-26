import actions from "./actions";
import types from "./types";
import reducer from "./reducer";
import sagas from "./sagas";

export { types, reducer, sagas };

export default {
  ...actions
};
