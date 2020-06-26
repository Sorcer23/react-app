import types from "./actionTypes";

const initUser = token => ({ type: types.INIT_USER, payload: { token } });
const reset = (withRedirect = true) => ({
  type: types.RESET,
  payload: { withRedirect }
});

const signin = values => ({ type: types.SIGNIN, payload: { values } });

export default {
  initUser,
  reset,
  signin
};
