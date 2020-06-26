import React from "react";
import PropTypes from "prop-types";
import { compose, componentFromProp, defaultProps } from "recompose";

import Icon from "components/Icon";

const ActionBody = componentFromProp("component");

function Action(props) {
  const { intl, iconName, label, component, ...restProps } = props;

  return (
    <div className="actions-menu__option">
      <ActionBody
        className="dropdown-action"
        component={component}
        {...restProps}
      >
        <Icon className="dropdown-action__icon" name={iconName} />
        {label}
      </ActionBody>
    </div>
  );
}

Action.defaultProps = {
  component: "button"
};

export default Action;
