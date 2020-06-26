import {
  withProps,
  compose,
  mapProps,
  withHandlers,
  withState,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";
import { withFormik } from "formik";
import { connect } from "react-redux";

import Yup from "services/Yup";
import passAuthUser from "HOC/passAuthUser";
import pageLayout from "HOC/pageLayout";
import withModal from "HOC/withModal";
import ServiceRequestNew from "./ServiceRequestNew";
import ApiService from "services/api";
import logger from "services/logger";

export default compose(
  passAuthUser,
  connect(state => {
    return {
      serviceTypes: state.appData.list.services
    };
  }),
  withModal("successEdit"),
  withProps(props => {
    const serviceTypeId = parseInt(props.match.params.serviceTypeId);

    return {
      serviceTypeId,
      serviceId: props.match.params.serviceId,
      service: props.serviceTypes.find(type => type.value === serviceTypeId)
    };
  }),
  withFormik({
    displayName: "newServiceRequest",
    enableReinitialize: true,

    mapPropsToValues: props => ({
      description: "",
      serviceId: props.serviceId,
      serviceTypeId: props.serviceTypeId,
      serviceProviderId: null,
      preferredDate: "",
      preferredTime: "",
      priceMin: "",
      priceMax: "",
      attachments: []
    }),

    validationSchema: Yup.object().shape({
      description: Yup.string().required(),
      preferredDate: Yup.string().required(),
      attachments: Yup.array().max(10)
    }),

    handleSubmit: async (values, formikBag) => {
      try {
        await ApiService.addServiceRequest(values);
        formikBag.props.openModal("successEdit");
        formikBag.resetForm();
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
        serviceTypeId: props.serviceTypeId
      });
      props.setServiceProviders(list);
    } catch (error) {
      logger(error);
    }
  }),
  withPropsOnChange(["serviceId"], async ({ serviceId, ...props }) => {
    if (serviceId == null) return;

    try {
      const { service } = await ApiService.getService(serviceId);

      props.setFieldValue("serviceProviderId", service.serviceProviderId);
    } catch (error) {
      logger(error);
    }
  }),
  injectIntl,
  pageLayout()
)(ServiceRequestNew);
