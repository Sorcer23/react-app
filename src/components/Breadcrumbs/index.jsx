import React from "react";
import { connect } from "react-redux";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

import config from "./config";
import Breadcrumbs from "./Breadcrumbs";

const BreadcrumbsContainer = props => {
  const { currentTitle } = props;

  const ConnectedBreadcrumbs = withBreadcrumbs(config, {
    currentTitle
  })(Breadcrumbs);
  return <ConnectedBreadcrumbs {...props} />;
};

export default BreadcrumbsContainer;
