import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";

function AddressCard(props) {
  const {
    intl,
    address,
    handleSetActive,
    handleEdit,
    handleDeleteAddress
  } = props;

  return (
    <div className="address-item">
      <div className="address-item__content">
        <label className="radio-btn">
          <input
            type="radio"
            name="address"
            checked={address.selected}
            onChange={handleSetActive}
          />
          <span className="radio-btn__icon"></span>
          <span className="radio-btn__title">{address.name}</span>
        </label>
        <h4 className="address-item__title">
          {address.address2 || address.address1}
        </h4>
        <ul className="address-item__list">
          {/* <li className="address-item__item"><b>Landmark: </b>{address.landmark}</li> */}
          <li className="address-item__item">
            <b>Mobile: </b>
            {address.phone}
          </li>
        </ul>
      </div>
      <div className="address-item__actions">
        <div className="address-item__buttons-wrap">
          <button
            type="button"
            className="address-button"
            onClick={handleDeleteAddress}
          >
            <Icon className="address-button__icon" name={ICON_NAMES.trash} />
            <span className="address-button__title">
              {intl.formatMessage({ id: "ui.actions.delete" })}
            </span>
          </button>
          <button type="button" className="address-button" onClick={handleEdit}>
            <Icon className="address-button__icon" name={ICON_NAMES.edit} />
            <span className="address-button__title">
              {intl.formatMessage({ id: "ui.actions.edit" })}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
