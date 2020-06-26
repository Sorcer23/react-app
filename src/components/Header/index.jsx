import React, { Fragment, useState } from "react";
import { injectIntl } from "react-intl";
import { Link, NavLink } from "react-router-dom";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";

import withCheckScroll from "HOC/withCheckScroll";
import ROUTES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";
import Sidebar from "./Sidebar";
import NotificationsDropdown from "./NotificationsDropdown";
import NavItem from "./NavItem";

function Header(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { intl, isMobileMenuActive } = props;

  return (
    <Fragment>
      <header className="header">
        <div className="container header__inner">
          <Link to={ROUTES.home} className="header__logo">
            <img src="/img/logo.svg" alt="" />
          </Link>
          <nav className="header__navigation">
            <div
              className={classNames("menu menu--general", {
                "is-active": isMobileMenuActive
              })}
            >
              <NavItem
                exact
                to={ROUTES.home}
                icon={ICON_NAMES.home}
                title={intl.formatMessage({ id: "ui.navigation.home" })}
              />
              <NavItem
                to={ROUTES.shop}
                icon={ICON_NAMES.shop}
                title={intl.formatMessage({ id: "ui.navigation.shop" })}
              />
              <NavItem
                to={ROUTES.serviceCategories}
                icon={ICON_NAMES.hands}
                title={intl.formatMessage({ id: "ui.navigation.requests" })}
              />
              <NavItem
                to={ROUTES.serviceProviders}
                icon={ICON_NAMES.people}
                title={intl.formatMessage({ id: "ui.navigation.merchants" })}
              />
              <NavItem
                to={ROUTES.serviceRequestList}
                icon={ICON_NAMES.order}
                title={intl.formatMessage({ id: "ui.navigation.orders" })}
              />
            </div>
            <div className="menu menu--secondary">
              <NotificationsDropdown />

              <a href="#" className="menu-link">
                <Icon className="menu-link__icon" name={ICON_NAMES.basket} />
                {/*<span className="menu-link__title">Cart</span>*/}
              </a>
            </div>
            <button
              type="button"
              className="button-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name={ICON_NAMES.menu} />
            </button>
          </nav>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </Fragment>
  );
}

export default compose(
  injectIntl,
  connect(state => {
    return {
      windowWidth: state.common.windowWidth
    };
  }),
  withCheckScroll,
  withProps(props => {
    return {
      isMobileMenuActive:
        props.windowWidth < 768 && !props.scrollData.isScrolling
    };
  })
)(Header);
