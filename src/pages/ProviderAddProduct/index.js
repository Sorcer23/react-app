import { compose, mapProps, withHandlers } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Yup from "services/Yup";
import ProviderProductsModule from "modules/providerProducts";
import AppDataModule from "modules/appData";
import normalizeFormData from "utils/normalizeFormData";
import passProvider from "HOC/passProvider";
import pageLayout from "HOC/pageLayout";
import withConnectedFormik from "HOC/withConnectedFormik";
import AddProduct from "./AddProduct";

export default compose(
  passProvider,
  connect(
    state => {
      const {
        editingProduct,
        isRequestPublishLoading,
        isPreparingPreview
      } = state.providerProducts;
      return {
        initialFormData: editingProduct,
        commonData: AppDataModule.listSelector(state)(
          "productCategories",
          "productSubCategories",
          "deliveryOptions",
          "colors",
          "priceUnit"
        ),
        isRequestPublishLoading,
        isPreparingPreview
      };
    },
    {
      getProductToEdit: ProviderProductsModule.getProductToEdit,
      resetEditingProduct: ProviderProductsModule.resetEditingProduct,
      postProduct: ProviderProductsModule.postProduct,
      requestPublish: ProviderProductsModule.requestPublish,
      showPreview: ProviderProductsModule.showPreview
    }
  ),
  mapProps(props => {
    return {
      ...props,
      productId: props.match.params.id,
      productEntities: props.initialFormData.products,
      initialFormData: {
        ...props.initialFormData,
        products: props.initialFormData.products.map(product => product.id)
      }
    };
  }),
  withConnectedFormik({
    displayName: "postProduct",
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      title: Yup.object().shape({ en: Yup.string().required() }),
      images: Yup.array()
        .required()
        .max(10),
      // products: Yup.array().max(10),
      categoryId: Yup.string().required(),
      subCategoryId: Yup.string().required(),
      deliveryOption: Yup.string().required(),
      price: Yup.string().required(),
      colors: Yup.array().required(),
      description: Yup.object().shape({
        en: Yup.string()
          .required()
          .max(2000)
      }),
      priceUnit: Yup.string().required()
    }),

    mapPropsToValues: props => {
      return normalizeFormData(props.initialFormData);
    },

    handleSubmit: (values, formikBag) => {
      const { submitType } = values;
      const { postProduct, requestPublish, showPreview } = formikBag.props;

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
          postProduct(values);
        }
      }
    }
  }),
  injectIntl,
  pageLayout()
)(AddProduct);
