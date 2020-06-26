import {
  compose,
  withProps,
  withReducer,
  withHandlers,
  withState,
  branch,
  renderComponent,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import AppDataModule from "modules/appData";
import ApiService from "services/api/ApiService";
import logger from "services/logger";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";

import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";
import ServiceRequestResponseView from "./ServiceRequestResponseView";

const initialState = {
  data: {},
  isLoading: true,
  isExist: true
};

export default compose(
  connect(state => {
    return {
      commonData: AppDataModule.listSelector(state)("priceUnit", "services"),
      userId: state.account.user.id
    };
  }),
  withProps(props => {
    return {
      reloadRoute: props.location.state && props.location.state.reloadRoute,
      serviceRequestId: props.match.params.id
    };
  }),
  withReducer(
    "serviceResponse",
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
    getData: ({ dispatch, serviceRequestId, ...props }) => async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { response } = await ApiService.getServiceRequestResponse(
          serviceRequestId
        );

        dispatch({
          type: "GET_SUCCESS",
          payload: { data: response }
        });
      } catch (error) {
        logger(error);
        dispatch({
          type: "GET_FAILURE",
          payload: {
            errorType: error.type
          }
        });
      }
    }
  }),
  withPropsOnChange(["serviceRequestId", "reloadRoute"], props => {
    props.getData();
  }),
  branch(
    props => props.serviceResponse.isLoading,
    renderComponent(PagePreloader)
  ),
  branch(props => !props.serviceResponse.isExist, renderComponent(NotFound)),
  passAuthUser,
  pageLayout(),
  injectIntl
)(ServiceRequestResponseView);
