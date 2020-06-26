import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "components/Icon";

function NavItem(props) {
  const { to, exact, icon, title } = props;

  return (
    <NavLink
      to={to}
      exact={exact}
      className="menu-link"
      activeClassName="menu-link--current"
    >
      <Icon className="menu-link__icon" name={icon} />
      <span className="menu-link__title">{title}</span>
    </NavLink>
  );
}

export default NavItem;
