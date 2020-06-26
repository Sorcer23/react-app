import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { injectIntl } from "react-intl";

import ModalModule from "modules/modal";
import Modal from "components/modals/Modal";
import LangSelect from "components/LangSelect";
import Button from "components/Button";

function ModalRejectReason(props) {
  const {
    intl,
    hide,
    params: { content, editUrl }
  } = props;

  return (
    <Modal {...props} onRequestClose={hide}>
      <div className="popup popup-notice">
        <div className="popup__head">
          <div className="popup__title">
            {intl.formatMessage({ id: "ui.navigation.reject_reason" })}
          </div>
        </div>
        <div className="popup__body">
          {content != null && (
            <div
              className="popup-notice__message"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          )}

          <Button to={editUrl} onClick={hide}>
            {intl.formatMessage({ id: "ui.actions.edit" })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default compose(
  injectIntl,
  connect(null, {
    hide: ModalModule.hide
  })
)(ModalRejectReason);
