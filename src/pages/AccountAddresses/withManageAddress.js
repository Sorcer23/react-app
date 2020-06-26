import React from "react";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";

import Yup from "services/Yup";
import AccountModule from "modules/account";
import withConnectedFormik from "HOC/withConnectedFormik";
import withModal from "HOC/withModal";
import normalizeFormData from "utils/normalizeFormData";
import getMultiLangValue from "utils/getMultiLangValue";
import AddAddressByMap from "components/AddAddressByMap";
import ModalWholeAddress from "./ModalWholeAddress";

export default function withManageAddress(Component) {
  function ComponentWithManageAddress(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <AddAddressByMap
          isOpen={props.modals["modalMapAddress"]}
          onRequestClose={() => props.closeModal("modalMapAddress")}
          onSave={props.handleSaveMapAddress}
        />
        <ModalWholeAddress
          {...props}
          isOpen={props.modals["modalWholeAddress"]}
          onRequestClose={() => props.closeModal("modalWholeAddress")}
        />
        <Component {...props} />
      </form>
    );
  }

  return compose(
    connect(
      state => {
        return {
          data: state.account.addresses.editingAddress,
          user: state.account.user
        };
      },
      {
        postAddress: AccountModule.postAddress,
        saveAddressFromMap: AccountModule.saveAddressFromMap
      }
    ),
    withModal("modalMapAddress", "modalWholeAddress"),
    withConnectedFormik({
      displayName: "address",
      enableReinitialize: true,

      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        phone: Yup.string().required(),
        address1: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        aptNumber: Yup.string().required()
      }),

      mapPropsToValues: ({ user, data }) => {
        return normalizeFormData({
          ...data,
          name:
            data.name ||
            `${getMultiLangValue(user.firstName)} ${getMultiLangValue(
              user.lastName
            )}`,
          phone: data.phone || user.phone
        });
      },

      handleSubmit: (values, formikBag) => {
        const { postAddress, closeModal } = formikBag.props;
        postAddress(values);
        closeModal("modalWholeAddress");
      }
    }),
    withHandlers({
      handleSaveMapAddress: props => place => {
        props.saveAddressFromMap(place);
        props.closeModal("modalMapAddress");
        props.openModal("modalWholeAddress");
      }
    })
  )(ComponentWithManageAddress);
}
