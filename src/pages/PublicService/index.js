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
import PublicService from "./PublicService";

const initialState = {
  data: {},
  isLoading: true,
  isExist: true
};

export default compose(
  mapProps(({ match, ...restProps }) => {
    return {
      serviceId: match.params.id,
      ...restProps
    };
  }),
  withReducer(
    "service",
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
        const { service } = props.isProviderPreview
          ? await ApiService.getProviderService(props.serviceId)
          : await ApiService.getService(props.serviceId);

        dispatch({
          type: "GET_SUCCESS",
          payload: { data: service }
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
  withPropsOnChange(["serviceId"], props => {
    props.getData();
  }),
  branch(props => props.service.isLoading, renderComponent(PagePreloader)),
  branch(props => !props.service.isExist, renderComponent(NotFound)),
  passAuthUser,
  pageLayout(),
  injectIntl
)(PublicService);
