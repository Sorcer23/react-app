import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import AccountModule from "modules/account";
import withConnectedFormik from "HOC/withConnectedFormik";
import withModal from "HOC/withModal";
import normalizeFormData from "utils/normalizeFormData";
import AddressCard from "./AddressCard";
import withManageAddress from "../withManageAddress";

export default compose(
  withManageAddress,
  connect(null, {
    deleteAddress: AccountModule.deleteAddress,
    setActive: AccountModule.setActive,
    editAddress: AccountModule.editAddress
  }),
  withHandlers({
    handleDeleteAddress: props => event => {
      props.deleteAddress(props.address.id);
    },
    handleSetActive: props => event => {
      props.setActive(props.address.id);
    },
    handleEdit: props => event => {
      props.editAddress(props.address.id);
      props.openModal("modalWholeAddress");
    }
  }),
  injectIntl
)(AddressCard);
