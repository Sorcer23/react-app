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
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";

import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";
import ServiceRequestView from "./ServiceRequestView";

const initialState = {
  data: {},
  isLoading: true,
  isExist: true
};

export default compose(
  connect(state => {
    return {
      commonData: AppDataModule.listSelector(state)("priceUnit", "services")
    };
  }),
  withProps(props => {
    return {
      serviceRequestId: props.match.params.id,
      serviceResponseId: props.match.params.responseId
    };
  }),
  withReducer(
    "serviceRequest",
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
    getData: ({
      dispatch,
      serviceRequestId,
      byProvider,
      ...props
    }) => async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { request } = byProvider
          ? await ApiService.getServiceRequestForProvider(serviceRequestId)
          : await ApiService.getServiceRequest(serviceRequestId);

        dispatch({
          type: "GET_SUCCESS",
          payload: { data: request }
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
  withPropsOnChange(["serviceRequestId"], props => {
    props.getData();
  }),
  branch(
    props => props.serviceRequest.isLoading,
    renderComponent(PagePreloader)
  ),
  branch(props => !props.serviceRequest.isExist, renderComponent(NotFound)),
  passAuthUser,
  pageLayout(),
  injectIntl
)(ServiceRequestView);
