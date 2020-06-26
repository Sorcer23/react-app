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
import passAuthUser from "HOC/passAuthUser";
import pageLayout from "HOC/pageLayout";
import ServiceRequestEdit from "./ServiceRequestEdit";
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
  passAuthUser,
  connect(state => {
    return {
      services: state.appData.list.services
    };
  }),
  withModal("successEdit"),
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
    displayName: "editServiceRequest",
    enableReinitialize: true,

    mapPropsToValues: props => {
      return props.serviceRequest.data;
    },

    validationSchema: Yup.object().shape({
      description: Yup.string().required(),
      preferredDate: Yup.string().required(),
      attachments: Yup.array().max(10)
    }),

    handleSubmit: async (values, formikBag) => {
      try {
        const { request } = await ApiService.updateServiceRequest(values);
        formikBag.setValues(request);
        formikBag.props.openModal("successEdit");
      } catch (error) {
        logger(error);
      }
    }
  }),
  withState("serviceProviders", "setServiceProviders", []),
  withPropsOnChange([], async props => {
    try {
      const { list } = await ApiService.getServiceProviders({
        perPage: 9999,
        serviceTypeId: props.serviceRequest.data.serviceTypeId
      });
      props.setServiceProviders(list);
    } catch (error) {
      logger(error);
    }
  }),
  withPropsOnChange(
    ["serviceRequestId"],
    async ({ dispatch, serviceRequestId }) => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { request } = await ApiService.getServiceRequest(
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
)(ServiceRequestEdit);
