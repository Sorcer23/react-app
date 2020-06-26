import actions from "./actions";
import reducer from "./reducer";
import sagas from "./sagas";
import * as config from "./config";

export { reducer, sagas, config };

export default {
  ...actions
};
