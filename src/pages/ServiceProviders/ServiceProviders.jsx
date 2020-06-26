import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "config/routes";
import history from "services/history";
import ApiService from "services/api/ApiService";
import getServerFileUrl from "utils/getServerFileUrl";
import MultiLangContent from "components/MultiLangContent";
import Icon, { ICON_NAMES } from "components/Icon";
import ServiceTypes from "./ServiceTypes";
import Categories from "./Categories";
import Preloader from "components/Preloader";
import LinesEllipsis from "components/LinesEllipsis";
import Search from "components/Search";
import Rating from "components/Rating";

import ProviderAddresses from "./ProviderAddresses";

const ServiceProviders = props => {
  const { intl, serviceProviders, changeFilter } = props;

  return (
    <main className="main">
      <div className="service-providers-search-container container">
        {/* <ul className="breadcrumbs">
          <li className="breadcrumb">
            <a className="breadcrumb__link" href="#">
              <span>Categories</span>
            </a>
            <span className="breadcrumb__separator">/</span>
          </li>
          <li className="breadcrumb">
            <span className="breadcrumb__link">
              <span>Service Providers</span>
            </span>
          </li>
        </ul> */}

        <Search
          apiLoadResults={ApiService.getServiceProvidersSearchMatches}
          onSelectQuery={query => changeFilter("q", query)}
        />
      </div>

      <Categories />
      <ServiceTypes />

      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            {intl.formatMessage({ id: "ui.navigation.service_providers" })}
          </h1>
        </div>

        {serviceProviders.isLoading ? (
          <Preloader />
        ) : (
          <div className="section-body">
            <div className="row products-list">
              {serviceProviders.list.map(provider => (
                <div key={provider.id} className="col-sm-6 col-md-4">
                  <Link
                    className="product-card"
                    to={`${ROUTES.serviceProvider}/${provider.id}`}
                  >
                    <div className="product-card__image-wrap">
                      <img
                        src={getServerFileUrl(provider.images[0], {
                          width: 100,
                          method: "resize"
                        })}
                        className="product-card__image"
                        alt="Service provider"
                      />
                    </div>
                    <div className="product-card__description">
                      <div className="product-card__head">
                        <span className="product-card__title-link">
                          <MultiLangContent text={provider.businessName} />
                        </span>
                        <Rating value={provider.rating} />
                      </div>
                      <div className="product-card__body">
                        <LinesEllipsis
                          className="product-card__text"
                          text={provider.businessIntro}
                        />
                        <div className="product-card__info">
                          <ProviderAddresses locations={provider.locations} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ServiceProviders;
