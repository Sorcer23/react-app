import React from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";

import ModalModule from "modules/modal";
import Icon, { ICON_NAMES } from "components/Icon";
import "./style.scss";

const defaults = {
  style: {
    overlay: {
      backgroundColor: null
    },
    content: {
      top: null,
      left: null,
      right: null,
      bottom: null,
      border: null,
      background: null,
      borderRadius: null,
      padding: null,
      position: null,
      overflow: null
    }
  }
};

const Modal = props => {
  const { name, onRequestClose, hide } = props;

  const handleClose = () => {
    if (typeof onRequestClose === "function") {
      onRequestClose();
      return;
    }

    hide(name);
  };

  return (
    <ReactModal {...defaults} {...props} onRequestClose={handleClose}>
      {
        <button type="button" className="popup__close" onClick={handleClose}>
          <Icon name={ICON_NAMES.close} />
        </button>
      }
      {props.children}
    </ReactModal>
  );
};

export default connect(null, {
  hide: ModalModule.hide
})(Modal);
