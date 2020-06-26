import React from "react";
import { injectIntl } from "react-intl";

import Modal from "components/modals/Modal";
import DetailedOptionTag from "./DetailedOptionTag";

function ModalSelectTags(props) {
  const { intl, value, handleDelete, placeholder } = props;

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className="popup popup-location">
        <div className="popup__head">
          <div className="popup__title">{placeholder}</div>
        </div>
        <div className="popup__body">
          <div className="popup-location__list">
            {value.map(tag => (
              <DetailedOptionTag
                key={tag.value}
                tag={tag}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      }
    </Modal>
  );
}

export default injectIntl(ModalSelectTags);
