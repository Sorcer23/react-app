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
import queryString from "query-string";

import history from "services/history";
import passAuthUser from "HOC/passAuthUser";
import ApiService from "services/api/ApiService";
import logger from "services/logger";
import PagePreloader from "components/PagePreloader";
import Services from "./Services";

const INITIAL_STATE = {
  list: [],
  total: 0,
  totalFiltered: 0,
  isInitialLoading: true,
  wasFirstLoad: false,
  isUpdating: false,
  pagination: {
    perPage: 10,
    offset: 0
  },
  filter: {
    categoryId: null,
    serviceTypeId: null,
    q: null
  }
};

export default compose(
  passAuthUser,
  withProps(props => {
    return {
      queryParams: queryString.parse(props.location.search)
    };
  }),
  withReducer(
    "services",
    "dispatch",
    (state, action) => {
      const { payload } = action;

      switch (action.type) {
        case "GET_INITIAL_DATA_SUCCESS":
          return {
            ...state,
            isInitialLoading: false,
            list: payload.list,
            total: payload.records,
            wasFirstLoad: true
          };

        case "GET_INITIAL_DATA_FAILURE":
          return INITIAL_STATE;

        case "UPDATE_DATA_REQUEST":
          return { ...state, isUpdating: true };

        case "UPDATE_DATA_FAILURE":
          return { ...state, isUpdating: false };

        case "UPDATE_DATA_SUCCESS":
          return {
            ...state,
            isUpdating: false,
            list: payload.list,
            totalFiltered: payload.records
          };

        case "LOAD_MORE_REQUEST":
          return { ...state, isLoadingMore: true };

        case "LOAD_MORE_FAILURE":
          return { ...state, isLoadingMore: false };

        case "LOAD_MORE_SUCCESS":
          return {
            ...state,
            isLoadingMore: false,
            pagination: { ...state.pagination, offset: payload.offset },
            list: [...state.list, ...payload.list]
          };

        case "CHANGE_FILTER": {
          const nextFilter =
            payload.values != null
              ? { ...state.filter, ...payload.values }
              : { ...state.filter, [payload.name]: payload.value };

          if (nextFilter.categoryId !== state.filter.categoryId)
            nextFilter.serviceTypeId = null;

          return {
            ...state,
            isFiltered: true,
            pagination: INITIAL_STATE.pagination,
            filter: nextFilter
          };
        }

        case "RESET_FILTER":
          return {
            ...state,
            isFiltered: false,
            pagination: INITIAL_STATE.pagination,
            filter: INITIAL_STATE.filter
          };
      }
    },
    ({ queryParams }) => {
      return {
        ...INITIAL_STATE,
        filter: {
          ...INITIAL_STATE.filter,
          ...queryParams,
          categoryId:
            queryParams.categoryId && parseInt(queryParams.categoryId),
          serviceTypeId:
            queryParams.serviceTypeId && parseInt(queryParams.serviceTypeId)
        }
      };
    }
  ),
  withHandlers({
    setInitialData: ({ dispatch, services }) => async () => {
      try {
        const { list, records } = await ApiService.getServices({
          ...services.pagination,
          ...services.filter
        });
        dispatch({
          type: "GET_INITIAL_DATA_SUCCESS",
          payload: { list, records }
        });
      } catch (error) {
        dispatch({ type: "GET_INITIAL_DATA_FAILURE" });
        logger(error);
      }
    },

    updateDataByFilter: ({ dispatch, services }) => async () => {
      dispatch({ type: "UPDATE_DATA_REQUEST" });
      try {
        const { list, records } = await ApiService.getServices({
          ...services.pagination,
          ...services.filter
        });
        history.push({
          search: queryString.stringify(services.filter, {
            skipNull: true
          })
        });
        dispatch({ type: "UPDATE_DATA_SUCCESS", payload: { list, records } });
      } catch (error) {
        dispatch({ type: "UPDATE_DATA_FAILURE" });
        logger(error);
      }
    },

    loadMore: ({ dispatch, services }) => async page => {
      dispatch({ type: "LOAD_MORE_REQUEST" });

      const nextOffset =
        services.pagination.offset + services.pagination.perPage;

      try {
        const { list } = await ApiService.getServices({
          ...services.pagination,
          offset: nextOffset,
          ...services.filter
        });
        dispatch({
          type: "LOAD_MORE_SUCCESS",
          payload: { list, offset: nextOffset }
        });
      } catch (error) {
        dispatch({ type: "LOAD_MORE_FAILURE" });
        logger(error);
      }
    },

    changeFilter: ({ dispatch }) => (name, value) => {
      dispatch({ type: "CHANGE_FILTER", payload: { name, value } });
    },

    resetFilter: ({ dispatch }) => () => {
      dispatch({ type: "RESET_FILTER" });
    },

    applyFilter: ({ dispatch }) => values => {
      dispatch({ type: "CHANGE_FILTER", payload: { values } });
    }
  }),
  // filter change
  withPropsOnChange(
    (props, nextProps) => {
      return props.services.filter !== nextProps.services.filter;
    },
    props => {
      if (!props.services.wasFirstLoad) {
        props.setInitialData();
        return;
      }

      props.updateDataByFilter();
    }
  ),
  // load more
  branch(
    props => props.services.isInitialLoading,
    renderComponent(PagePreloader)
  ),
  withProps(props => {
    const { services } = props;

    return {
      hasMore:
        services.wasFirstLoad &&
        !services.isUpdating &&
        !services.isLoadingMore &&
        services.list.length !== services.total &&
        (services.isFiltered
          ? services.totalFiltered !== services.list.length
          : true)
    };
  }),
  withContext(
    {
      filter: PropTypes.object.isRequired,
      changeFilter: PropTypes.func.isRequired,
      resetFilter: PropTypes.func.isRequired,
      applyFilter: PropTypes.func.isRequired
    },
    props => ({
      filter: props.services.filter,
      changeFilter: props.changeFilter,
      resetFilter: props.resetFilter,
      applyFilter: props.applyFilter
    })
  ),
  injectIntl
)(Services);
