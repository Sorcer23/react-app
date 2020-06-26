import React from "react";
import PropTypes from "prop-types";

import Icon, { ICON_NAMES } from "components/Icon";

function CheckboxMarker(props) {
  const { className, isChecked } = props;

  return (
    <span className={`${className} checkbox-marker`}>
      <Icon name={ICON_NAMES.check} active={isChecked} />
    </span>
  );
}

CheckboxMarker.defaultProps = {
  className: ""
};

CheckboxMarker.propTypes = {
  isChecked: PropTypes.bool,
  className: PropTypes.string
};

export default CheckboxMarker;
