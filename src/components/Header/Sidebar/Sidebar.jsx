import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import classNames from "classnames";
import onClickOutside from "react-onclickoutside";
import Collapse, { Panel } from "rc-collapse";

import ROUTES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";
import MultiLangContent from "components/MultiLangContent";
import ProviderStatus from "./ProviderStatus";

function Sidebar(props) {
  const {
    intl,
    isOpen,
    providerStatus,
    showProviderActions,
    showBecomeProvider,
    user,
    onClose,
    logout,
    handleChangeLang
  } = props;

  Sidebar.handleClickOutside = () => onClose();

  return (
    <div
      className={classNames("sidebar", {
        "is-open": isOpen
      })}
    >
      <div className="sidebar__head">
        <div className="user-info">
          <div className="user-info__title">
            <MultiLangContent text={user.firstName} />
            {` `}
            <MultiLangContent text={user.lastName} />
          </div>
          {/* <div className="user-info__location">
            <Icon name={ICON_NAMES.pin}
              className="user-info__icon"
            />
            Doha, Qatar
          </div> */}
        </div>
        <button type="button" className="sidebar__close" onClick={onClose}>
          <Icon name={ICON_NAMES.closeLight} />
        </button>
      </div>
      <div className="sidebar__body">
        <nav>
          <ul className="sidebar__list">
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.money} className="sidebar-item__icon" />
                {intl.formatMessage({ id: "ui.navigation.sinan_points" })}
              </a>
            </li>
            <li className="sidebar-item">
              <Link to={ROUTES.account} className="sidebar-item__link">
                <Icon name={ICON_NAMES.user} className="sidebar-item__icon" />
                <div>
                  {intl.formatMessage({ id: "ui.navigation.profile" })}
                  <ProviderStatus status={providerStatus} />
                </div>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to={ROUTES.accountNotifications}
                className="sidebar-item__link"
              >
                <Icon name={ICON_NAMES.ring} className="sidebar-item__icon" />
                {intl.formatMessage({ id: "ui.navigation.notifications" })}
              </Link>
            </li>
            {/* <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.flag} className="sidebar-item__icon" />
                {intl.formatMessage({ id: "ui.navigation.country" })}
              </a>
            </li> */}
            {showProviderActions && (
              <Collapse className="sidebar-collapse-item">
                <Panel
                  header={
                    <span className="sidebar-item__link">
                      <Icon
                        name={ICON_NAMES.list}
                        className="sidebar-item__icon"
                      />
                      {intl.formatMessage({ id: "ui.navigation.management" })}
                    </span>
                  }
                >
                  <li className="sidebar-item">
                    <Link
                      to={ROUTES.providerProducts}
                      className="sidebar-item__link"
                    >
                      {intl.formatMessage({ id: "ui.navigation.product_list" })}
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link
                      to={ROUTES.providerServices}
                      className="sidebar-item__link"
                    >
                      {intl.formatMessage({ id: "ui.navigation.service_list" })}
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link
                      to={ROUTES.providerPosts}
                      className="sidebar-item__link"
                    >
                      {intl.formatMessage({ id: "ui.navigation.post_list" })}
                    </Link>
                  </li>
                </Panel>
              </Collapse>
            )}
            {showBecomeProvider && (
              <li className="sidebar-item">
                <Link
                  className="sidebar-item__link"
                  to={ROUTES.serviceProviderVerification}
                >
                  <Icon
                    name={ICON_NAMES.handSettings}
                    className="sidebar-item__icon"
                  />
                  {intl.formatMessage({
                    id: "ui.navigation.become_service_provider"
                  })}
                </Link>
              </li>
            )}
            <Collapse className="sidebar-collapse-item">
              <Panel
                header={
                  <span className="sidebar-item__link">
                    <Icon
                      name={ICON_NAMES.info}
                      className="sidebar-item__icon"
                    />
                    {intl.formatMessage({ id: "ui.navigation.about" })}
                  </span>
                }
              >
                <li className="sidebar-item">
                  <Link to={ROUTES.aboutUs} className="sidebar-item__link">
                    {intl.formatMessage({ id: "ui.navigation.about_us" })}
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    to={ROUTES.termsConditions}
                    className="sidebar-item__link"
                  >
                    {intl.formatMessage({
                      id: "ui.navigation.terms_conditions"
                    })}
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    to={ROUTES.privacyPolicy}
                    className="sidebar-item__link"
                  >
                    {intl.formatMessage({
                      id: "ui.navigation.privacy_policy"
                    })}
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={ROUTES.contactUs} className="sidebar-item__link">
                    {intl.formatMessage({ id: "ui.navigation.contact_us" })}
                  </Link>
                </li>
              </Panel>
            </Collapse>
            <li className="sidebar-item">
              <button
                type="button"
                className="sidebar-item__link"
                onClick={handleChangeLang}
              >
                <Icon
                  name={ICON_NAMES.language}
                  className="sidebar-item__icon"
                />
                {intl.formatMessage({ id: "ui.navigation.language" })}
              </button>
            </li>
            <li className="sidebar-item">
              <button
                type="button"
                className="sidebar-item__link"
                onClick={logout}
              >
                <Icon name={ICON_NAMES.logout} className="sidebar-item__icon" />
                {intl.formatMessage({ id: "ui.navigation.logout" })}
              </button>
            </li>
            {/* <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon
                  name={ICON_NAMES.list}
                  className="sidebar-item__icon"
                />
                Insight
                </a>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className="sidebar__copyright">
        ©2020 Sinan HQ. All Rights Reserved.
      </div>
    </div>
  );
}

export default onClickOutside(Sidebar, {
  handleClickOutside: () => Sidebar.handleClickOutside
});
