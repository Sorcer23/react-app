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
import Products from "./Products";

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
    subCategoryId: null,
    colors: [],
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
    "products",
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

        case "CHANGE_FILTER":
          const nextFilter =
            payload.values != null
              ? { ...state.filter, ...payload.values }
              : { ...state.filter, [payload.name]: payload.value };

          if (nextFilter.categoryId !== state.filter.categoryId)
            nextFilter.subCategoryId = null;

          return {
            ...state,
            isFiltered: true,
            pagination: INITIAL_STATE.pagination,
            filter: nextFilter
          };

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
          subCategoryId:
            queryParams.subCategoryId && parseInt(queryParams.subCategoryId)
        }
      };
    }
  ),
  withHandlers({
    setInitialData: ({ dispatch, products }) => async () => {
      try {
        const { list, records } = await ApiService.getProducts({
          ...products.pagination,
          ...products.filter
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

    updateDataByFilter: ({ dispatch, products }) => async () => {
      dispatch({ type: "UPDATE_DATA_REQUEST" });
      try {
        const { list, records } = await ApiService.getProducts({
          ...products.pagination,
          ...products.filter
        });
        history.push({
          search: queryString.stringify(products.filter, {
            skipNull: true
          })
        });
        dispatch({ type: "UPDATE_DATA_SUCCESS", payload: { list, records } });
      } catch (error) {
        dispatch({ type: "UPDATE_DATA_FAILURE" });
        logger(error);
      }
    },

    loadMore: ({ dispatch, products }) => async page => {
      dispatch({ type: "LOAD_MORE_REQUEST" });

      const nextOffset =
        products.pagination.offset + products.pagination.perPage;

      try {
        const { list } = await ApiService.getProducts({
          ...products.pagination,
          offset: nextOffset,
          ...products.filter
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
      return props.products.filter !== nextProps.products.filter;
    },
    props => {
      if (!props.products.wasFirstLoad) {
        props.setInitialData();
        return;
      }

      props.updateDataByFilter();
    }
  ),
  // load more
  branch(
    props => props.products.isInitialLoading,
    renderComponent(PagePreloader)
  ),
  withProps(props => {
    const { products } = props;

    return {
      hasMore:
        products.wasFirstLoad &&
        !products.isUpdating &&
        !products.isLoadingMore &&
        products.list.length !== products.total &&
        (products.isFiltered
          ? products.totalFiltered !== products.list.length
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
      filter: props.products.filter,
      changeFilter: props.changeFilter,
      resetFilter: props.resetFilter,
      applyFilter: props.applyFilter
    })
  ),
  injectIntl
)(Products);
