import PropTypes from "prop-types";
import {
  compose,
  mapProps,
  withProps,
  withHandlers,
  withContext,
  withReducer,
  withPropsOnChange,
  withState,
  branch,
  renderComponent
} from "recompose";
import { injectIntl } from "react-intl";
import queryString from "query-string";
import { connect } from "react-redux";

import { selectors as accountSelectors } from "modules/account";
import logger from "services/logger";
import history from "services/history";
import ApiService from "services/api/ApiService";
import pageLayout from "HOC/pageLayout";
import ServiceRequestList from "./ServiceRequestList";

export default compose(
  withProps(props => {
    return {
      queryParams: queryString.parse(props.location.search)
    };
  }),
  connect(state => {
    return {
      isServiceProvider: accountSelectors.isServiceProvider(state)
    };
  }),
  withReducer(
    "list",
    "dispatch",
    (state, action) => {
      const { type, payload } = action;

      switch (type) {
        case "GET_REQUEST":
          return { ...state, isLoading: true };
        case "GET_FAILURE":
          return { ...state, isLoading: false };
        case "GET_SUCCESS":
          return {
            ...state,
            isLoading: false,
            data: payload.list,
            pagination: {
              ...state.pagination,
              total: payload.total
            }
          };
        case "CHANGE_PAGINATION":
          return {
            ...state,
            pagination: {
              ...state.pagination,
              page: payload.page,
              offset: getOffset(state.pagination.perPage, payload.page)
            }
          };
        case "SET_OWN_REQUEST_ACTIVE":
          return {
            ...state,
            isCustomerView: payload.isActive
          };
        case "SET_STATUS":
          return {
            ...state,
            status: payload.status
          };
        default:
          return state;
      }
    },
    props => {
      const page = parseInt(props.queryParams.page) || 1;
      const perPage = 10;

      return {
        isLoading: true,
        data: [],
        status: "new",
        pagination: {
          perPage,
          offset: getOffset(perPage, page),
          page,
          total: 0
        },
        isCustomerView: props.isServiceProvider ? false : true
      };
    }
  ),
  withHandlers({
    getList: ({ dispatch, list: stateList }) => async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const { list, records } = await getApiListMethod(stateList)({
          ...stateList.pagination,
          status: getStatusNumberByName(
            stateList.status,
            stateList.isCustomerView
          )
        });
        dispatch({
          type: "GET_SUCCESS",
          payload: { list, total: records }
        });
      } catch (error) {
        dispatch({ type: "GET_FAILURE" });
        logger(error);
      }
    },
    setOwnRequestsActive: ({ dispatch }) => async isActive => {
      dispatch({ type: "SET_OWN_REQUEST_ACTIVE", payload: { isActive } });
    },
    setStatus: ({ dispatch }) => status => {
      dispatch({ type: "SET_STATUS", payload: { status } });
    }
  }),
  withHandlers({
    handlePaginationChange: ({ dispatch }) => page => {
      history.push({
        search: queryString.stringify({ page })
      });
      dispatch({ type: "CHANGE_PAGINATION", payload: { page } });
    }
  }),
  withPropsOnChange(
    (props, nextProps) => {
      return (
        props.list.pagination.page !== nextProps.list.pagination.page ||
        props.list.isCustomerView !== nextProps.list.isCustomerView ||
        props.list.status !== nextProps.list.status
      );
    },
    props => {
      props.getList();
    }
  ),
  injectIntl,
  pageLayout()
)(ServiceRequestList);

function getOffset(perPage, page) {
  return perPage * page - perPage;
}

function getApiListMethod(stateList) {
  if (stateList.isCustomerView) return ApiService.getServiceRequestList;
  if (stateList.status === "new")
    return ApiService.getProviderServiceRequestList;
  return ApiService.getServiceRequestResponses;
}

function getStatusNumberByName(name, isCustomerView) {
  switch (name) {
    case "new":
      return [0];
    case "ongoing": {
      if (isCustomerView) return [1];
      return [];
    }
    case "history":
      return [2, 4, 9];
    default:
      return [];
  }
}
