import {
  withProps,
  compose,
  withReducer,
  withHandlers,
  withState,
  withPropsOnChange,
  branch,
  renderComponent
} from "recompose";
import { injectIntl } from "react-intl";
import { withFormik } from "formik";
import { connect } from "react-redux";

import Yup from "services/Yup";
import passProvider from "HOC/passProvider";
import pageLayout from "HOC/pageLayout";
import ServiceRequestResponse from "./ServiceRequestResponse";
import ApiService from "services/api";
import logger from "services/logger";
import PagePreloader from "components/PagePreloader";
import NotFound from "pages/NotFound";
import withModal from "HOC/withModal";

const INITIAL_STATE = {
  isLoading: true,
  isExist: true,
  data: {}
};

export default compose(
  passProvider,
  connect(state => {
    return {
      services: state.appData.list.services
    };
  }),
  withModal("successResponse"),
  withProps(props => {
    return {
      serviceRequestId: parseInt(props.match.params.id)
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
        case "SEND_RESPONSE_REQUEST":
          return { ...state, isSending: true };
        case "SEND_RESPONSE_FAILURE":
          return { ...state, isSending: false };
        case "SEND_RESPONSE_SUCCESS":
          return { ...state, isSending: false };
        default:
          return state;
      }
    },
    INITIAL_STATE
  ),
  withProps(({ serviceRequest, services }) => {
    if (serviceRequest.isExist)
      return {
        service: services.find(
          _s => _s.value === serviceRequest.data.serviceTypeId
        )
      };

    return {};
  }),
  withFormik({
    displayName: "responseServiceRequest",
    enableReinitialize: true,

    mapPropsToValues: props => {
      return {
        requestId: props.serviceRequest.data.id || "",
        description: "",
        availability: "",
        priceMin: "0",
        priceMax: "",
        warranty: "",
        discount: "",
        offerExpired: "",
        deliveryDate: "",
        attachments: []
      };
    },

    validationSchema: Yup.object().shape({
      description: Yup.string().required(),
      priceMin: Yup.string().required(),
      priceMax: Yup.string().required(),
      offerExpired: Yup.string().required(),
      deliveryDate: Yup.string().required()
    }),

    handleSubmit: async (values, formikBag) => {
      const { dispatch } = formikBag.props;

      try {
        dispatch({ type: "SEND_RESPONSE_REQUEST" });
        const { response } = await ApiService.sendServiceRequestResponse(
          values
        );
        dispatch({ type: "SEND_RESPONSE_SUCCESS" });
        formikBag.props.openModal("successResponse");
      } catch (error) {
        dispatch({ type: "SEND_RESPONSE_FAILURE" });
        logger(error);
      }
    }
  }),
  withState("serviceProviders", "setServiceProviders", []),
  withPropsOnChange(
    ["serviceRequestId"],
    async ({ dispatch, serviceRequestId }) => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { request } = await ApiService.getServiceRequestForProvider(
          serviceRequestId
        );
        dispatch({ type: "GET_SUCCESS", payload: { data: request } });
      } catch (error) {
        logger(error);
        dispatch({ type: "GET_FAILURE", payload: { error } });
      }
    }
  ),
  branch(
    props => props.serviceRequest.isLoading,
    renderComponent(PagePreloader)
  ),
  branch(props => !props.serviceRequest.isExist, renderComponent(NotFound)),
  injectIntl,
  pageLayout()
)(ServiceRequestResponse);
