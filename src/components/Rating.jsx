import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";

function Rating(props) {
  const { value } = props;

  if (value == null) return null;

  return (
    <div className="rating">
      <Icon className="rating__icon" name={ICON_NAMES.star} active />
      <div className="rating__value">{Math.round(value * 10) / 10}</div>
    </div>
  );
}

export default Rating;
