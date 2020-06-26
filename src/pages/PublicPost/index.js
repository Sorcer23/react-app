import {
  compose,
  mapProps,
  withReducer,
  withHandlers,
  branch,
  renderComponent,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";

import ApiService from "services/api/ApiService";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";

import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";
import PublicPost from "./PublicPost";

const initialState = {
  data: {},
  isLoading: true,
  isExist: true
};

export default compose(
  mapProps(({ match, ...restProps }) => {
    return {
      postId: match.params.id,
      ...restProps
    };
  }),
  withReducer(
    "post",
    "dispatch",
    (state, action) => {
      const { type, payload } = action;

      switch (type) {
        case "GET_REQUEST":
          return { isLoading: true, isExist: false, data: {} };
        case "GET_FAILURE":
          return {
            ...state,
            isLoading: false,
            isExist: payload.errorType !== "NOT_FOUND"
          };
        case "GET_SUCCESS":
          return {
            ...state,
            isLoading: false,
            isExist: true,
            data: payload.data
          };
        default:
          return state;
      }
    },
    initialState
  ),
  withHandlers({
    getData: ({ dispatch, ...props }) => async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { post } = props.isProviderPreview
          ? await ApiService.getProviderPost(props.postId)
          : await ApiService.getPost(props.postId);

        dispatch({
          type: "GET_SUCCESS",
          payload: { data: post }
        });
      } catch (error) {
        dispatch({
          type: "GET_FAILURE",
          payload: {
            errorType: error.type
          }
        });
      }
    }
  }),
  withPropsOnChange(["postId"], props => {
    props.getData();
  }),
  branch(props => props.post.isLoading, renderComponent(PagePreloader)),
  branch(props => !props.post.isExist, renderComponent(NotFound)),
  passAuthUser,
  pageLayout(),
  injectIntl
)(PublicPost);
