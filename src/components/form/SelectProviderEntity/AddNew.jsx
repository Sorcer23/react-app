import React, { Fragment } from "react";

import withModal from "HOC/withModal";
import Icon, { ICON_NAMES } from "components/Icon";
import ModalEntities from "./ModalEntities";

function AddNew(props) {
  const {
    apiGetList,
    exceptValue,
    previewImagesName,
    selectedEntities,
    error,
    placeholder,
    listPlaceholder,
    isModalOpen,
    setModalOpen,
    onAdd
  } = props;

  return (
    <Fragment>
      <button
        className="upload"
        type="button"
        onClick={() => setModalOpen(true)}
      >
        <span className="upload__inner">
          <span className="upload__info">
            <span className="upload__icon">
              <Icon name={ICON_NAMES.add} />
            </span>
            <span className="upload__title">{placeholder}</span>
          </span>
        </span>

        {error != null && <span className="field-error">{error}</span>}
      </button>
      <ModalEntities
        isOpen={isModalOpen}
        title={listPlaceholder}
        selectedEntities={selectedEntities}
        apiGetList={apiGetList}
        onSelect={onAdd}
        previewImagesName={previewImagesName}
        exceptValue={exceptValue}
        onRequestClose={() => setModalOpen(false)}
      />
    </Fragment>
  );
}

export default withModal()(AddNew);
