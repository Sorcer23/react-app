import types from "./types";

const getProducts = () => ({ type: types.GET_PRODUCTS });
const getProductToEdit = id => ({
  type: types.GET_PRODUCT_TO_EDIT,
  payload: { id }
});
const resetEditingProduct = () => ({ type: types.RESET_EDITING_PRODUCT });
const postProduct = (values, hideMessage) => ({
  type: types.POST_PRODUCT,
  payload: { values, hideMessage }
});
const deleteProduct = id => ({ type: types.DELETE_PRODUCT, payload: { id } });
const requestPublish = values => ({
  type: types.REQUEST_PUBLISH,
  payload: { values }
});
const showPreview = values => ({
  type: types.SHOW_PREVIEW,
  payload: { values }
});

export default {
  getProducts,
  postProduct,
  deleteProduct,
  requestPublish,
  getProductToEdit,
  resetEditingProduct,
  showPreview
};
