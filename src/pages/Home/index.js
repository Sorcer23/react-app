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
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ApiService from "services/api";
import logger from "services/logger";
import PagePreloader from "components/PagePreloader";
import Home from "./Home";

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
    spaceTypeId: null,
    styleId: [],
    budgetId: [],
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
    "posts",
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
          return {
            ...state,
            isFiltered: true,
            pagination: INITIAL_STATE.pagination,
            filter:
              payload.values != null
                ? { ...state.filter, ...payload.values }
                : { ...state.filter, [payload.name]: payload.value }
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
          ...queryParams
        }
      };
    }
  ),
  withHandlers({
    setInitialData: ({ dispatch, posts }) => async () => {
      try {
        const { list, records } = await ApiService.getPosts({
          ...posts.pagination,
          ...posts.filter
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

    updateDataByFilter: ({ dispatch, posts }) => async () => {
      dispatch({ type: "UPDATE_DATA_REQUEST" });
      try {
        const { list, records } = await ApiService.getPosts({
          ...posts.pagination,
          ...posts.filter
        });
        history.push({
          search: queryString.stringify(posts.filter, {
            skipNull: true
          })
        });
        dispatch({ type: "UPDATE_DATA_SUCCESS", payload: { list, records } });
      } catch (error) {
        dispatch({ type: "UPDATE_DATA_FAILURE" });
        logger(error);
      }
    },

    loadMore: ({ dispatch, posts }) => async page => {
      dispatch({ type: "LOAD_MORE_REQUEST" });

      const nextOffset = posts.pagination.offset + posts.pagination.perPage;

      try {
        const { list } = await ApiService.getPosts({
          ...posts.pagination,
          offset: nextOffset,
          ...posts.filter
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
      return props.posts.filter !== nextProps.posts.filter;
    },
    props => {
      if (!props.posts.wasFirstLoad) {
        props.setInitialData();
        return;
      }

      props.updateDataByFilter();
    }
  ),
  // load more
  branch(props => props.posts.isInitialLoading, renderComponent(PagePreloader)),
  withProps(props => {
    const { posts } = props;

    return {
      hasMore:
        posts.wasFirstLoad &&
        !posts.isUpdating &&
        !posts.isLoadingMore &&
        posts.list.length !== posts.total &&
        (posts.isFiltered ? posts.totalFiltered !== posts.list.length : true)
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
      filter: props.posts.filter,
      changeFilter: props.changeFilter,
      resetFilter: props.resetFilter,
      applyFilter: props.applyFilter
    })
  ),
  pageLayout(),
  injectIntl
)(Home);
