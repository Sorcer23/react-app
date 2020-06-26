import React from "react";
import { Field } from "formik";
import { injectIntl } from "react-intl";

import Icon, { ICON_NAMES } from "components/Icon";
import Modal from "components/modals/Modal";
import Input from "components/form/Input";
import MapForm from "./MapForm";

function AddAddressByMap(props) {
  const { intl, isOpen, onRequestClose, onSave } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="popup popup-map">
        <div className="popup__head">
          <div className="popup__title">
            {intl.formatMessage({ id: "ui.profile.add_new_address" })}
          </div>
        </div>
        <div className="popup__body popup-map__inner">
          <div className="popup-map__bg-map">
            <MapForm onSave={onSave} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default injectIntl(AddAddressByMap);
