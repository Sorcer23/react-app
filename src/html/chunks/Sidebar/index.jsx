import React from "react";
import Icon, { ICON_NAMES } from "components/Icon";

function Sidebar(props) {
  return (
    <div className="sidebar is-open">
      <div className="sidebar__head">
        <div className="user-info">
          <div className="user-info__title">Daniel Ali Khan</div>
          <div className="user-info__location">
            <Icon name={ICON_NAMES.pin} className="user-info__icon" />
            Doha, Qatar
          </div>
        </div>
        <Icon name={ICON_NAMES.closeLight} className="sidebar__close" />
      </div>
      <div className="sidebar__body">
        <nav>
          <ul className="sidebar__list">
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.money} className="sidebar-item__icon" />
                Sinan Points
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.user} className="sidebar-item__icon" />
                Profile
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.ring} className="sidebar-item__icon" />
                Notifications
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.flag} className="sidebar-item__icon" />
                Country
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon
                  name={ICON_NAMES.language}
                  className="sidebar-item__icon"
                />
                Language
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon
                  name={ICON_NAMES.handSettings}
                  className="sidebar-item__icon"
                />
                Become Service provider
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon
                  name={ICON_NAMES.phoneQuestion}
                  className="sidebar-item__icon"
                />
                Contact Us
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.info} className="sidebar-item__icon" />
                About Us
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.logout} className="sidebar-item__icon" />
                Logout
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-item__link" href="">
                <Icon name={ICON_NAMES.user} className="sidebar-item__icon" />
                Insight
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
