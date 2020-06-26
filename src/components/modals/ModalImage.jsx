import React from "react";
import { injectIntl } from "react-intl";

import Modal from "components/modals/Modal";

function ModalImage(props) {
  const { intl, src } = props;

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className="popup popup-image">
        {/* <div className="popup__head">
          <div className="popup__title"></div>
        </div> */}
        <div className="popup__body">
          <img src={src} className="popup-image__image" alt="" />
        </div>
      </div>
      }
    </Modal>
  );
}

export default injectIntl(ModalImage);
