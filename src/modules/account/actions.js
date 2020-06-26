import types from "./types";

const getAccount = () => ({ type: types.GET_ACCOUNT });
const postAccount = values => ({
  type: types.POST_ACCOUNT,
  payload: { values }
});
const getAddresses = () => ({ type: types.GET_ADDRESSES });
const saveAddressFromMap = place => ({
  type: types.SAVE_ADDRESS_FROM_MAP,
  payload: { place }
});
const postAddress = values => ({
  type: types.POST_ADDRESS,
  payload: { values }
});
const editAddress = id => ({ type: types.EDIT_ADDRESS, payload: { id } });
const setActive = id => ({ type: types.SET_ACTIVE, payload: { id } });
const deleteAddress = id => ({ type: types.DELETE_ADDRESS, payload: { id } });

export default {
  getAccount,
  postAccount,
  getAddresses,
  saveAddressFromMap,
  postAddress,
  setActive,
  deleteAddress,
  editAddress
};
