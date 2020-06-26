import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { injectIntl } from "react-intl";

import ModalModule from "modules/modal";
import Modal from "components/modals/Modal";
import Button from "components/Button";
import MultiLangContent from "components/MultiLangContent";

function ModalAction(props) {
  const {
    intl,
    hide,
    params: { type, okLabel, message, onAfterClose, onConfirm, onCancel },
    children
  } = props;

  const handleClose = () => {
    hide();
    if (typeof onAfterClose === "function") onAfterClose();
  };

  return (
    <Modal {...props} onRequestClose={handleClose}>
      <div className="popup popup-notice">
        <div className="popup__head">
          <div className="popup__title">{type}</div>
        </div>
        <div className="popup__body">
          <p className="popup-notice__message">{message}</p>

          {children || (
            <div className="row">
              <div className="col">
                <Button
                  onClick={() => {
                    if (typeof onConfirm === "function") onConfirm();
                    handleClose();
                  }}
                >
                  {okLabel ||
                    (type === "confirmation" &&
                      intl.formatMessage({ id: "ui.common.yes" })) ||
                    intl.formatMessage({ id: "ui.actions.ok" })}
                </Button>
              </div>

              {type === "confirmation" && (
                <div className="col">
                  <Button
                    onClick={() => {
                      if (typeof onCancel === "function") onCancel();
                      handleClose();
                    }}
                  >
                    {intl.formatMessage({ id: "ui.actions.cancel" })}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

ModalAction.propTypes = {
  params: PropTypes.shape({
    type: PropTypes.oneOf([
      "success",
      "error",
      "info",
      "warning",
      "confirmation"
    ]).isRequired,
    message: PropTypes.node.isRequired
  })
};

export default compose(
  injectIntl,
  connect(null, {
    hide: ModalModule.hide
  })
)(ModalAction);
