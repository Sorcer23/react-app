import { compose, mapProps, withHandlers } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import AccountModule from "modules/account";
import normalizeFormData from "utils/normalizeFormData";
import passAuthUser from "HOC/passAuthUser";
import pageLayout from "HOC/pageLayout";
import withConnectedFormik from "HOC/withConnectedFormik";
import AccountAddresses from "./AccountAddresses";

export default compose(
  connect(
    state => {
      return {
        addresses: state.account.addresses.list
      };
    },
    {
      getAddresses: AccountModule.getAddresses
    }
  ),
  injectIntl,
  passAuthUser,
  pageLayout()
)(AccountAddresses);
