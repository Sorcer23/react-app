import React from "react";
import { compose, defaultProps, componentFromProp } from "recompose";

import Icon, { ICON_NAMES } from "components/Icon";
import getServerFileUrl from "utils/getServerFileUrl";

const EntityContainer = defaultProps({ component: "div" })(
  componentFromProp("component")
);

function EntitySLide(props) {
  const { entity, onClick } = props;

  const preview = typeof entity === "string" ? entity : entity.images[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="swiper-slide swiper-slide--low"
    >
      {/* <button type="button" className="btn-zoom btn-zoom--xs">
        <Icon className="product-zoom" name={ICON_NAMES.zoom} />
      </button> */}
      <img
        src={getServerFileUrl(preview, {
          width: 430,
          method: "resize"
        })}
        alt=""
      />
    </button>
  );
}

export default EntitySLide;
