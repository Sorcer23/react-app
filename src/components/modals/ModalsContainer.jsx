import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MODAL_NAMES } from "modules/modal";
import ModalLangChange from "components/modals/ModalLangChange";
import ModalAction from "components/modals/ModalAction";
import ModalRejectReason from "components/modals/ModalRejectReason";
import ModalPhoneVerify from "pages/SignUp/ModalPhoneVerify";
import ModalSelectTags from "components/form/Select/ModalSelectTags";

const ModalRootContainer = props => {
  const { name } = props;

  switch (name) {
    case MODAL_NAMES.notice:
      return <ModalAction {...props} />;
    case MODAL_NAMES.selectTags:
      return <ModalSelectTags {...props} />;
    case MODAL_NAMES.phoneVerify:
      return <ModalPhoneVerify {...props} />;
    case MODAL_NAMES.langChange:
      return <ModalLangChange {...props} />;
    case MODAL_NAMES.rejectReason:
      return <ModalRejectReason {...props} />;
    default:
      return null;
  }
};

ModalRootContainer.propTypes = {
  name: PropTypes.oneOf(Object.keys(MODAL_NAMES)),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  params: PropTypes.object
};

export default connect(state => {
  const { name, isOpen, onClose, params } = state.modal;

  return {
    name,
    isOpen,
    onClose,
    params
  };
})(ModalRootContainer);
