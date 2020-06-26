import { compose, mapProps, withHandlers } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Yup from "services/Yup";
import ProviderServicesModule from "modules/providerServices";
import AppDataModule from "modules/appData";
import normalizeFormData from "utils/normalizeFormData";
import passProvider from "HOC/passProvider";
import pageLayout from "HOC/pageLayout";
import withConnectedFormik from "HOC/withConnectedFormik";
import AddService from "./AddService";

export default compose(
  passProvider,
  connect(
    state => {
      const {
        editingService,
        isRequestPublishLoading,
        isPreparingPreview
      } = state.providerServices;
      return {
        initialFormData: editingService,
        commonData: AppDataModule.listSelector(state)(
          "categories",
          "services",
          "priceUnit",
          "services",
          "colors"
        ),
        isRequestPublishLoading,
        isPreparingPreview
      };
    },
    {
      getServiceToEdit: ProviderServicesModule.getServiceToEdit,
      resetEditingService: ProviderServicesModule.resetEditingService,
      postService: ProviderServicesModule.postService,
      requestPublish: ProviderServicesModule.requestPublish,
      showPreview: ProviderServicesModule.showPreview
    }
  ),
  mapProps(props => {
    return {
      ...props,
      serviceId: props.match.params.id
    };
  }),
  withConnectedFormik({
    displayName: "postService",
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      title: Yup.object().shape({
        en: Yup.string().required()
      }),
      description: Yup.object().shape({
        en: Yup.string()
          .required()
          .max(2000)
      }),
      serviceTypeId: Yup.string().required(),
      serviceCategoryId: Yup.string().required(),
      images: Yup.array()
        .required()
        .max(10)
    }),

    mapPropsToValues: props => {
      return normalizeFormData(props.initialFormData);
    },

    handleSubmit: (values, formikBag) => {
      const { submitType } = values;
      const { postService, requestPublish, showPreview } = formikBag.props;

      switch (submitType) {
        case "publish": {
          requestPublish(values);
          break;
        }

        case "preview": {
          showPreview(values);
          break;
        }

        default: {
          postService(values);
        }
      }
    }
  }),
  injectIntl,
  pageLayout()
)(AddService);
