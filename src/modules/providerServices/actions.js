import types from "./types";

const getServices = () => ({ type: types.GET_SERVICES });
const getServiceToEdit = id => ({
  type: types.GET_SERVICE_TO_EDIT,
  payload: { id }
});
const resetEditingService = () => ({ type: types.RESET_EDITING_SERVICE });
const postService = (values, hideMessage) => ({
  type: types.POST_SERVICE,
  payload: { values, hideMessage }
});
const deleteService = id => ({ type: types.DELETE_SERVICE, payload: { id } });
const requestPublish = values => ({
  type: types.REQUEST_PUBLISH,
  payload: { values }
});
const showPreview = values => ({
  type: types.SHOW_PREVIEW,
  payload: { values }
});

export default {
  getServices,
  getServiceToEdit,
  resetEditingService,
  postService,
  deleteService,
  requestPublish,
  showPreview
};
