import types from "./types";

const getPosts = () => ({ type: types.GET_POSTS });
const getPostToEdit = id => ({ type: types.GET_POST_TO_EDIT, payload: { id } });
const resetEditingPost = () => ({ type: types.RESET_EDITING_POST });
const postPost = (values, hideMessage) => ({
  type: types.POST_POST,
  payload: { values, hideMessage }
});
const deletePost = id => ({ type: types.DELETE_POST, payload: { id } });
const requestPublish = values => ({
  type: types.REQUEST_PUBLISH,
  payload: { values }
});
const showPreview = values => ({
  type: types.SHOW_PREVIEW,
  payload: { values }
});

export default {
  getPosts,
  getPostToEdit,
  resetEditingPost,
  postPost,
  deletePost,
  requestPublish,
  showPreview
};
