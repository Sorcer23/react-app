import React, { useEffect } from "react";
import { Field } from "formik";

import PagePagination from "components/PagePagination";
import Filter from "./Filter";
import Service from "./Service";
import { Link } from "react-router-dom";
import ROUTES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";

function ProviderServices(props) {
  const { intl, handlePaginationChange } = props;
  const services = props.list.data;
  const pagination = props.list.pagination;
  const isLoading = props.list.isLoading;

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.services" })}
            </h1>
            <Link to={ROUTES.serviceAdd} className="link-page">
              {intl.formatMessage({ id: "ui.navigation.add_service" })}
              <Icon name={ICON_NAMES.add} className="link-page__icon" />
            </Link>
          </div>

          <div className="data__body">
            <div className="section">
              <div className="section__body">
                <Filter />

                {!isLoading && pagination.total === 0 && (
                  <div className="section-title section-empty-title">
                    {intl.formatMessage({
                      id: "ui.services.no_added_services"
                    })}
                  </div>
                )}

                {services.map(service => (
                  <Service key={service.id} service={service} />
                ))}

                <PagePagination
                  {...pagination}
                  onChange={handlePaginationChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProviderServices;
