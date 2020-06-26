import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";

function DetailedOptionTag(props) {
  const { onDelete, tag } = props;

  return (
    <div className="popup-location__item location-item">
      <div className="location-item__title">{tag.label}</div>
      <button type="button" onClick={() => onDelete(tag)}>
        <Icon className="location-item__icon" name={ICON_NAMES.trash} />
      </button>
    </div>
  );
}

export default DetailedOptionTag;
