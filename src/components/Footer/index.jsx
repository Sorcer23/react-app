import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

import ROUTES from "config/routes";
import "./style.scss";

const Footer = props => {
  const { intl } = props;

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer__inner">
          <div className="col-lg-4">
            <p className="copyright">©2020 Sinan HQ. All Rights Reserved.</p>
          </div>
          <div className="col-lg-4">
            <ul className="footer-menu">
              <li className="footer-menu__item">
                <Link to={ROUTES.privacyPolicy} className="footer-menu__link">
                  {intl.formatMessage({ id: "ui.navigation.privacy_policy" })}
                </Link>
              </li>
              <li className="footer-menu__item">
                <Link to={ROUTES.termsConditions} className="footer-menu__link">
                  {intl.formatMessage({ id: "ui.navigation.terms_conditions" })}
                </Link>
              </li>
              {/* <li className="footer-menu__item">
                <Link to={ROUTES.faqs} className="footer-menu__link">
                  {intl.formatMessage({ id: "ui.navigation.faqs" })}
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="col-lg-4">
            {/* <div className="social">
              <ul className="social__list">
                <li className="social__item">
                  <a href="#" className="social__link"></a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default injectIntl(Footer);
