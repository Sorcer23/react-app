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

const ServiceCategories = props => {
  const { categories } = props;

  return (
    <main className="main">
      <div className="container">
        <div className="data__head">
          <h1 className="section-title">Categories</h1>
        </div>
        <div className="row categories-list">
          {categories.map(type => (
            <Link
              to={type.value}
              className="col-sm-6 col-md-4 col-lg-3 card-wrap"
            >
              <div className="card">
                <div
                  className="card__inner"
                  style={{
                    backgroundImage: `url(${getServerFileUrl(type.image, {
                      height: 374,
                      method: "resize"
                    })})`
                  }}
                >
                  <div className="card__title">{type.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default compose(
  passAuthUser,
  pageLayout(),
  connect(state => {
    return {
      categories: AppDataModule.listSelector(state)("categories").categories
    };
  })
)(ServiceCategories);
