import React, { Fragment } from "react";

import Icon, { ICON_NAMES } from "components/Icon";

function AddressNew(props) {
  const { openModal } = props;

  return (
    <button
      type="button"
      className="upload upload--large"
      onClick={() => openModal("modalMapAddress")}
    >
      <span className="upload__inner">
        <span className="upload__info">
          <span className="upload__icon">
            <Icon name={ICON_NAMES.add} />
          </span>
          <span className="upload__title">Add Address</span>
        </span>
      </span>
    </button>
  );
}

export default AddressNew;
