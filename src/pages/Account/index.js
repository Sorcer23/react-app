import { compose, mapProps, withProps } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Yup from "services/Yup";
import AccountModule, { config as accountConfig } from "modules/account";
import ProviderAccountModule from "modules/providerAccount";
import AppDataModule from "modules/appData";
import normalizeFormData from "utils/normalizeFormData";
import passAuthUser from "HOC/passAuthUser";
import pageLayout from "HOC/pageLayout";
import withConnectedFormik from "HOC/withConnectedFormik";
import Account from "./Account";

export default compose(
  connect(
    state => {
      return {
        data: {
          ...state.account.user,
          ...state.providerAccount
        },
        commonData: AppDataModule.listSelector(state)(
          "gender",
          "occupation",
          "aboutSinan",
          "whySinan",
          "services",
          "proffesionTypes",
          "categories",
          "attachments"
        )
      };
    },
    {
      getUserData: AccountModule.getAccount,
      getProviderData: ProviderAccountModule.getAccount,
      postUserData: AccountModule.postAccount,
      postProviderData: ProviderAccountModule.postAccount
    }
  ),
  withProps(props => {
    return {
      enableProviderForm: isEnableProviderForm(props)
    };
  }),
  withConnectedFormik({
    displayName: "account",
    enableReinitialize: true,

    mapPropsToValues: props => {
      return normalizeFormData({ cr: "", ...props.data });
    },

    validationSchema: props => {
      const ACCOUNT_VALIDATION = {
        firstName: Yup.object().shape({
          en: Yup.string().required()
        }),
        lastName: Yup.object().shape({
          en: Yup.string().required()
        }),
        email: Yup.string().required(),
        phone: Yup.string().required()
      };

      const PROVIDER_VALIDATION = !props.enableProviderForm
        ? null
        : {
            profilePic: Yup.string().required(),
            companyPic: Yup.string().required(),
            businessName: Yup.object().shape({
              en: Yup.string().required()
            }),
            businessEmail: Yup.string()
              .required()
              .email(),
            professionType: Yup.string().required(),
            professionalExperience: Yup.string().required(),
            contactNumber: Yup.string().required(),
            categoryId: Yup.string().required(),
            companyWebsite: Yup.string().required(),
            businessIntro: Yup.object().shape({
              en: Yup.string()
                .required()
                .max(2000)
            }),
            deliveryDescription: Yup.object().shape({
              en: Yup.string().max(500)
            }),
            locations: Yup.array()
              .min(1)
              .max(10),
            services: Yup.string().required()
            // workSamples: Yup.array().max(5)
          };

      return Yup.object().shape({
        ...ACCOUNT_VALIDATION,
        ...PROVIDER_VALIDATION
      });
    },

    handleSubmit: (values, formikBag) => {
      const { postUserData, postProviderData } = formikBag.props;

      postUserData(values);

      if (isEnableProviderForm({ values, ...formikBag.props }))
        postProviderData(values);
    }
  }),
  injectIntl,
  passAuthUser,
  pageLayout()
)(Account);

function isEnableProviderForm(props) {
  return (
    (props.data != null &&
      typeof props.data.serviceProviderStatus === "number") ||
    (props.history.location.state &&
      props.history.location.state.enableProviderForm)
  );
}
