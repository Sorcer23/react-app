import {
  compose,
  withProps,
  withPropsOnChange,
  withReducer,
  branch,
  renderComponent,
  withHandlers
} from "recompose";
import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";

import withModal from "HOC/withModal";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import logger from "services/logger";
import ApiService from "services/api";
import history from "services/history";
import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";
import ServiceRequestReview from "./ServiceRequestReview";
import ROUTES from "config/routes";
import Yup from "services/Yup";

const INITIAL_STATE = {
  data: {},
  isLoading: true,
  isExist: true,
  isSending: false
};

export default compose(
  withProps(props => {
    return { requestId: props.match.params.id };
  }),
  withModal("successSend", ""),
  withReducer(
    "serviceRequest",
    "dispatch",
    (state, action) => {
      const { type, payload } = action;

      switch (type) {
        case "GET_REQUEST":
          return { isLoading: true, isExist: true, data: {} };
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
            data: payload.request
          };

        case "SEND_REQUEST": {
          return {
            ...state,
            isSending: true
          };
        }
        case "SEND_FAILURE": {
          return {
            ...state,
            isSending: false
          };
        }
        case "SEND_SUCCESS": {
          return {
            ...state,
            isSending: false
          };
        }
        default:
          return state;
      }
    },
    INITIAL_STATE
  ),
  withPropsOnChange(["requestId"], async ({ dispatch, requestId }) => {
    try {
      dispatch({ type: "GET_REQUEST" });
      const { request } = await ApiService.getServiceRequest(requestId);
      dispatch({ type: "GET_SUCCESS", payload: { request } });
    } catch (error) {
      dispatch({ type: "GET_FAILURE", payload: { errorType: error.type } });
      logger(error);
    }
  }),
  withHandlers({
    onModalSuccessSendCLose: props => () => {
      props.closeModal("successSend");
      history.push(ROUTES.serviceRequestList);
    }
  }),
  withFormik({
    displayName: "sendReview",

    mapPropsToValues: props => {
      return {
        review: "",
        rating: ""
      };
    },

    validationSchema: Yup.object().shape({
      rating: Yup.string().required()
    }),

    handleSubmit: async (values, formikBag) => {
      const { openModal, dispatch } = formikBag.props;
      try {
        dispatch({ type: "SEND_REQUEST" });
        await ApiService.sendReviewServiceRequest(
          formikBag.props.requestId,
          values.review,
          values.rating
        );
        dispatch({ type: "SEND_SUCCESS" });
        openModal("successSend");
      } catch (error) {
        dispatch({ type: "SEND_FAILURE" });
        logger(error);
      }
    }
  }),
  passAuthUser,
  branch(props => !props.serviceRequest.isExist, renderComponent(NotFound)),
  branch(
    props => props.serviceRequest.isLoading,
    renderComponent(PagePreloader)
  ),
  pageLayout(),
  injectIntl
)(ServiceRequestReview);
