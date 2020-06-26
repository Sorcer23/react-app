import React from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import AppDataModule from "modules/appData";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ROUTES from "config/routes";
import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import SearchServices from "./SearchServices";

const ServiceCategories = props => {
  const { intl, categories } = props;

  return (
    <main className="main">
      <div className="container">
        <SearchServices />
        <div className="data__head">
          <h1 className="section-title">
            {intl.formatMessage({ id: "ui.navigation.categories" })}
          </h1>
        </div>
        <div className="row categories-list">
          {categories.map(category => (
            <Link
              key={category.value}
              to={`${ROUTES.serviceTypes}/${category.value}`}
              className="col-sm-6 col-md-4 col-lg-3 card-wrap"
            >
              <div className="card">
                <div
                  className="card__inner"
                  style={{
                    backgroundImage: `url(${getServerFileUrl(category.image, {
                      height: 374,
                      method: "resize"
                    })})`
                  }}
                >
                  <div className="card__title">{category.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServiceCategories;
