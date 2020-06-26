import React from "react";
import Icon, { ICON_NAMES } from "components/Icon";

function OptionTag(props) {
  const { tag, onDelete } = props;

  return (
    <div className="select-tag">
      <div className="select-tag__title">{tag.label}</div>
      <button
        type="button"
        className="select-tag__delete"
        onClick={() => onDelete(tag)}
      >
        <Icon name={ICON_NAMES.close} />
      </button>
    </div>
  );
}

export default OptionTag;
