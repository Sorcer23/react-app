import React from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import ROUTES from "config/routes";

import NotFound from "pages/NotFound";
import Products from "./Products";
import Services from "./Services";

const Shop = props => {
  const { posts, hasMore, loadMore, resetFilter } = props;

  return (
    <div className="page-body">
      <div className="container">
        <div className="page-tabs">
          <NavLink
            to={ROUTES.products}
            exact
            className="tab-link"
            activeClassName="tab-link--active"
          >
            Products
          </NavLink>
          <NavLink
            to={ROUTES.services}
            exact
            className="tab-link"
            activeClassName="tab-link--active"
          >
            Services
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route
          exact
          path={ROUTES.shop}
          render={() => <Redirect to={ROUTES.products} />}
        />
        <Route exact path={ROUTES.products} component={Products} />
        <Route exact path={ROUTES.services} component={Services} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Shop;
