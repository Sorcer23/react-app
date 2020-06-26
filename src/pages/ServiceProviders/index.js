import {
  compose,
  lifecycle,
  withHandlers,
  withReducer,
  branch,
  renderComponent,
  withContext,
  withPropsOnChange,
  withProps
} from "recompose";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import history from "services/history";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ApiService from "services/api";
import logger from "services/logger";
import PagePreloader from "components/PagePreloader";
import ServiceProviders from "./ServiceProviders";
import ROUTES from "config/routes";

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  isFiltered: false,
  filter: {
    categoryId: null,
    serviceTypeId: null,
    q: ""
  }
  // pagination: {
  //   perPage: 10,
  //   offset: 0,
  // },
};

export default compose(
  passAuthUser,
  withReducer(
    "serviceProviders",
    "dispatch",
    (state, action) => {
      const { payload } = action;

      switch (action.type) {
        case "CHANGE_FILTER": {
          const nextFilter = {
            ...state.filter,
            [payload.name]: payload.value
          };

          if (nextFilter.categoryId !== state.filter.categoryId)
            nextFilter.serviceTypeId = null;

          return {
            ...state,
            isFiltered: true,
            // pagination: INITIAL_STATE.pagination,
            filter: nextFilter
          };
        }

        case "LOAD_DATA_REQUEST":
          return { ...state, isLoading: true };

        case "LOAD_DATA_FAILURE":
          return { ...state, isLoading: false };

        case "LOAD_DATA_SUCCESS":
          return {
            ...state,
            isLoading: false,
            list: payload.list
          };

        case "RESET":
          return INITIAL_STATE;
      }
    },
    INITIAL_STATE
  ),
  withHandlers({
    changeFilter: ({ dispatch }) => (name, value) => {
      dispatch({ type: "CHANGE_FILTER", payload: { name, value } });
    },

    reset: ({ dispatch }) => () => {
      dispatch({ type: "RESET" });
    },

    loadData: ({ dispatch, serviceProviders }) => async () => {
      dispatch({ type: "LOAD_DATA_REQUEST" });
      try {
        const { list, records } = await ApiService.getServiceProviders(
          serviceProviders.filter
        );
        dispatch({ type: "LOAD_DATA_SUCCESS", payload: { list, records } });
      } catch (error) {
        dispatch({ type: "LOAD_DATA_FAILURE" });
        logger(error);
      }
    }
  }),
  withPropsOnChange(
    (props, nextProps) => {
      return (
        props.serviceProviders.filter !== nextProps.serviceProviders.filter
      );
    },
    props => {
      props.loadData();
    }
  ),
  withContext(
    {
      filter: PropTypes.object.isRequired,
      changeFilter: PropTypes.func.isRequired
    },
    props => {
      return {
        filter: props.serviceProviders.filter,
        changeFilter: props.changeFilter
      };
    }
  ),
  pageLayout(),
  injectIntl
)(ServiceProviders);
