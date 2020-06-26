import React from "react";
import { Link } from "react-router-dom";

import Icon, { ICON_NAMES } from "components/Icon";
import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";

const ServiceTypes = props => {
  const { intl, services } = props;

  return (
    <main className="main">
      {/* <Slider /> */}
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            {intl.formatMessage({
              id:
                services.length === 0
                  ? "ui.services.no_services_in_category"
                  : "ui.navigation.services"
            })}
          </h1>
        </div>
        <div className="section-body">
          <div className="row products-list">
            {services.map(service => (
              <div key={service.value} className="col-sm-6 col-md-4">
                <div
                  className="info-card"
                  style={{
                    backgroundImage: `url(${getServerFileUrl(service.image, {
                      height: 434,
                      method: "resize"
                    })})`
                  }}
                >
                  <div className="info-card__description">
                    <span className="info-card__title">{service.label}</span>
                    <div className="info-card__text">{service.description}</div>
                    <Link
                      to={`${ROUTES.serviceRequestNew}/${service.value}`}
                      className="info-card__request"
                    >
                      {intl.formatMessage({ id: "ui.actions.request" })}{" "}
                      <span className="arrow-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceTypes;
