import React from "react";
import ROUTES from "config/routes";

import Icon, { ICON_NAMES } from "components/Icon";

function Header(props) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img src="/img/logo.svg" alt="" />
        </a>
        <nav className="">
          <div className="menu"></div>
          <button>
            <Icon name={ICON_NAMES.menu} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
