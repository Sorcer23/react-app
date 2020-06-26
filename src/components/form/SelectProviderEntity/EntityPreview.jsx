import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import MultiLangContent from "components/MultiLangContent";
import getServerFileUrl from "utils/getServerFileUrl";

function EntityPreview(props) {
  const { previewImagesName, entity, onDelete } = props;

  return (
    <button
      type="button"
      className="upload loaded"
      style={{
        backgroundImage:
          entity[previewImagesName].length > 0
            ? `url(${getServerFileUrl(entity[previewImagesName][0])})`
            : ""
      }}
      onClick={() => onDelete(entity)}
    >
      <span className="upload__inner">
        <span className="upload__info">
          <Icon className="upload__icon" name={ICON_NAMES.trash} />
        </span>
      </span>
      <span className="upload__text">
        <MultiLangContent text={entity.title} />
      </span>
    </button>
  );
}

export default EntityPreview;
