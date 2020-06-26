import React from "react";
import { injectIntl } from "react-intl";

import Modal from "components/modals/Modal";
import SelectedLocation from "./SelectedLocation";

function ModalSelectedLocation(props) {
  const { intl, locations, onDelete, placeholder } = props;

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className="popup popup-location">
        <div className="popup__head">
          <div className="popup__title">{placeholder}</div>
        </div>
        <div className="popup__body">
          <div className="popup-location__list">
            {locations.map(location => (
              <SelectedLocation
                key={location}
                location={location}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </div>
      }
    </Modal>
  );
}

export default injectIntl(ModalSelectedLocation);
