import { compose, mapProps, withHandlers } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Yup from "services/Yup";
import ProviderPostsModule from "modules/providerPosts";
import AppDataModule from "modules/appData";
import normalizeFormData from "utils/normalizeFormData";
import passProvider from "HOC/passProvider";
import pageLayout from "HOC/pageLayout";
import withConnectedFormik from "HOC/withConnectedFormik";
import AddPost from "./AddPost";

export default compose(
  passProvider,
  connect(
    state => {
      const {
        editingPost,
        isRequestPublishLoading,
        isPreparingPreview
      } = state.providerPosts;
      return {
        initialFormData: editingPost,
        commonData: AppDataModule.listSelector(state)(
          "spaceTypes",
          "style",
          "budget"
        ),
        isRequestPublishLoading,
        isPreparingPreview
      };
    },
    {
      getPostToEdit: ProviderPostsModule.getPostToEdit,
      resetEditingPost: ProviderPostsModule.resetEditingPost,
      postPost: ProviderPostsModule.postPost,
      requestPublish: ProviderPostsModule.requestPublish,
      showPreview: ProviderPostsModule.showPreview
    }
  ),
  mapProps(props => {
    return {
      ...props,
      postId: props.match.params.id,
      productEntities: props.initialFormData.products,
      serviceEntities: props.initialFormData.services,
      initialFormData: {
        ...props.initialFormData,
        products: props.initialFormData.products.map(product => product.id),
        services: props.initialFormData.services.map(service => service.id)
      }
    };
  }),
  withConnectedFormik({
    displayName: "postPost",
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      title: Yup.object().shape({ en: Yup.string().required() }),
      description: Yup.object().shape({
        en: Yup.string()
          .required()
          .max(500)
      }),
      fullDescription: Yup.object().shape({
        en: Yup.string()
          .required()
          .max(2000)
      }),
      images: Yup.array()
        .required()
        .max(10),
      products: Yup.array()
        .required()
        .max(10),
      services: Yup.array()
        .required()
        .max(10),
      spaceTypeId: Yup.string().required(),
      styleId: Yup.string().required(),
      budgetId: Yup.string().required()
    }),

    mapPropsToValues: props => {
      return normalizeFormData(props.initialFormData);
    },

    handleSubmit: (values, formikBag) => {
      const { submitType } = values;
      const { postPost, requestPublish, showPreview } = formikBag.props;

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
          postPost(values);
        }
      }
    }
  }),
  injectIntl,
  pageLayout()
)(AddPost);
