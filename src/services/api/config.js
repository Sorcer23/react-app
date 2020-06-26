import {
  success as notifySuccess,
  error as notifyError
} from "react-notification-system-redux";
import axios from "axios";

import store from "store";
import logger from "services/logger";
import history from "services/history";
import { DEFAULT_LANG } from "config";
import ROUTES from "config/routes";
import AuthModule from "modules/auth";
import {
  transformDataForApi,
  transformDataFromApi,
  transformApiValidation
} from "./utils";

var config = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  validateStatus: status => {
    return status;
  },
  transformRequest: [transformDataForApi, ...axios.defaults.transformRequest],
  transformResponse: [...axios.defaults.transformResponse, transformDataFromApi]
};

function handleRequest(config) {
  return {
    ...config,
    params: transformDataForApi(config.params)
  };
}

function handleResponse(response) {
  const { message = "Someting went wrong" } = response.data;

  // no error
  if (response.status < 400) {
    return response.data;
  }

  switch (response.status) {
    // validation error
    case 400:
      return Promise.reject({
        type: "VALIDATION",
        data: transformApiValidation(message)
      });

    // auth error
    case 401:
      store.dispatch(AuthModule.reset());

      return Promise.reject({
        type: "AUTH",
        data: message
      });

    // not found
    case 404:
      return Promise.reject({
        type: "NOT_FOUND",
        data: message
      });

    // user action error
    case 422:
      store.dispatch(
        notifyError({
          message
        })
      );

      return Promise.reject({
        type: "FAIL_ACTION",
        data: message
      });

    // common error
    default: {
      store.dispatch(
        notifyError({
          message
        })
      );

      return Promise.reject({
        type: "ERROR",
        data: message
      });
    }
  }
}

const handleResponseError = error => {
  logger(error);

  store.dispatch(
    notifyError({
      message: "Someting went wrong"
    })
  );

  return Promise.reject({
    type: "ERROR",
    data: error.message
  });
};

export {
  config as default,
  handleRequest,
  handleResponse,
  handleResponseError
};
