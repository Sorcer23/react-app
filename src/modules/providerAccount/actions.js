import types from "./types";

const requestToBeProvider = () => ({ type: types.REQUEST_TO_BE_PROVIDER });
const getAccount = () => ({ type: types.GET_ACCOUNT });
const postAccount = values => ({
  type: types.POST_ACCOUNT,
  payload: { values }
});

export default {
  getAccount,
  postAccount,
  requestToBeProvider
};
