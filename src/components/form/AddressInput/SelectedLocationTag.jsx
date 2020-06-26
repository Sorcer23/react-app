import React from "react";
import Icon, { ICON_NAMES } from "components/Icon";

function SelectedLocationTag(props) {
  const { location, onDelete } = props;

  return (
    <div className="select-tag">
      <div className="select-tag__title">{location}</div>
      <button
        type="button"
        className="select-tag__delete"
        onClick={() => onDelete(location)}
      >
        <Icon name={ICON_NAMES.close} />
      </button>
    </div>
  );
}

export default SelectedLocationTag;
