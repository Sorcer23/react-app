import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { injectIntl } from "react-intl";

import ModalModule from "modules/modal";
import Modal from "components/modals/Modal";
import LangSelect from "components/LangSelect";

function ModalLangChange(props) {
  const { intl, hide } = props;

  return (
    <Modal {...props} onRequestClose={hide}>
      <div className="popup popup--language">
        <div className="popup__head">
          <div className="popup__title">
            {intl.formatMessage({ id: "ui.language.select_language" })}
          </div>
        </div>
        <div className="popup__body">
          <LangSelect />
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
)(ModalLangChange);
