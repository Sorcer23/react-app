import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";

function SelectedLocation(props) {
  const { onDelete, location } = props;

  return (
    <div className="popup-location__item location-item">
      <div className="location-item__title">{location}</div>
      {typeof onDelete === "function" && (
        <button type="button" onClick={() => onDelete(location)}>
          <Icon className="location-item__icon" name={ICON_NAMES.trash} />
        </button>
      )}
    </div>
  );
}

export default SelectedLocation;
