import PropTypes from "prop-types";
import {
  compose,
  mapProps,
  withProps,
  withHandlers,
  withContext,
  withReducer,
  withPropsOnChange,
  branch,
  renderComponent
} from "recompose";
import queryString from "query-string";

import logger from "services/logger";
import history from "services/history";
import NotFound from "pages/NotFound";

const INITIAL_LIST = {
  data: [],
  isLoadingMore: false,
  isInitialLoading: false,
  pagination: {
    limit: 10,
    offset: 0,
    total: 0
  }
};

const withLoadMoreList = ({
  listName = "listData",
  apiGetList
}) => Component => {
  return compose(
    withReducer(
      listName,
      "dispatch",
      (state, action) => {
        const { payload } = action;

        switch (action.type) {
          case "FETCH_LIST_REQUEST": {
            return {
              ...state,
              isLoadingMore: !payload.isInitialLoading,
              isInitialLoading: payload.isInitialLoading
            };
          }

          case "FETCH_LIST_FAILURE": {
            return {
              ...state,
              isLoadingMore: false,
              isInitialLoading: false
            };
          }

          case "FETCH_LIST_SUCCESS": {
            return {
              ...state,
              isLoadingMore: false,
              isInitialLoading: false,
              data: payload.isInitialLoading
                ? payload.data
                : [...state.data, ...payload.data],
              pagination: {
                ...state.pagination,
                offset:
                  (payload.isInitialLoading ? 0 : state.pagination.offset) +
                  state.pagination.limit,
                total: payload.total
              }
            };
          }

          default:
            return state;
        }
      },
      INITIAL_LIST
    ),
    withProps(props => {
      return {
        hasMore:
          !props[listName].isLoadingMore &&
          !props[listName].isInitialLoading &&
          props[listName].pagination.offset < props[listName].pagination.total
      };
    }),
    withHandlers({
      fetchList: ({
        dispatch,
        [listName]: listState
      }) => async isInitialLoading => {
        try {
          dispatch({
            type: "FETCH_LIST_REQUEST",
            payload: { isInitialLoading }
          });
          const { [listName]: listData, records } = await apiGetList(
            listState.pagination.limit,
            isInitialLoading ? 0 : listState.pagination.offset
          );
          dispatch({
            type: "FETCH_LIST_SUCCESS",
            payload: {
              data: listData,
              total: parseInt(records),
              isInitialLoading
            }
          });
        } catch (error) {
          logger(error);
          dispatch({ type: "FETCH_LIST_FAILURE" });
        }
      }
    }),
    withHandlers({
      onLoadMore: props => () => props.fetchList()
    }),
    withPropsOnChange([], props => {
      props.fetchList(true);
    })
  )(Component);
};

export default withLoadMoreList;
