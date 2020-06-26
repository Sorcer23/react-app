import React from "react";
import { compose, defaultProps, componentFromProp } from "recompose";

import Icon, { ICON_NAMES } from "components/Icon";
import getServerFileUrl from "utils/getServerFileUrl";

const imageContainer = defaultProps({ component: "div" })(
  componentFromProp("component")
);

function imageSLide(props) {
  const { image, onClick } = props;

  const preview = typeof image === "string" ? image : image.images[0];

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

export default imageSLide;
