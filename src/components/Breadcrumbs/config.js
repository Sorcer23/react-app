import React from "react";
import ROUTES from "config/routes";
import { FormattedMessage } from "react-intl";

export default [
  {
    path: ROUTES.home,
    title: "ui.navigation.home"
  },
  {
    path: ROUTES.serviceProviders,
    title: "ui.navigation.service_providers"
  },
  {
    path: ROUTES.shop,
    title: "ui.navigation.shop"
  },
  {
    path: ROUTES.products,
    title: "ui.navigation.products"
  },
  {
    path: ROUTES.services,
    title: "ui.navigation.services"
  },
  {
    path: ROUTES.post,
    breadcrumb: null
  }
];
