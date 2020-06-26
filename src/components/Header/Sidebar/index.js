import { compose, mapProps, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import AuthModule from "modules/auth";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import { config as accountConfig } from "modules/account";
import AppDataText from "components/AppDataText";
import Sidebar from "./Sidebar";

export default compose(
  injectIntl,
  connect(
    state => {
      const { user } = state.account;
      return {
        providerStatus: user.serviceProviderStatus,
        user
      };
    },
    {
      logout: AuthModule.reset,
      showModal: ModalModule.show
    }
  ),
  withProps(props => {
    const { providerStatus } = props;

    return {
      showProviderActions:
        providerStatus === accountConfig.PROVIDER_STATUSES.approved,
      showBecomeProvider:
        providerStatus !== accountConfig.PROVIDER_STATUSES.approved &&
        providerStatus !== accountConfig.PROVIDER_STATUSES.requested
    };
  }),
  withHandlers({
    handleChangeLang: props => () => {
      props.showModal({ name: MODAL_NAMES.langChange });
    }
  })
)(Sidebar);
