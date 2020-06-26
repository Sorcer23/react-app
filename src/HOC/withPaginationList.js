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

const withPaginationList = params => Component => {
  const { apiGetList } = params;

  return compose(
    withProps(props => {
      return {
        queryParams: queryString.parse(props.location.search)
      };
    }),
    withReducer(
      "list",
      "dispatch",
      (state, action) => {
        const { type, payload } = action;

        switch (type) {
          case "GET_REQUEST":
            return { ...state, isLoading: true, isExist: true };
          case "GET_FAILURE":
            return {
              ...state,
              isLoading: false,
              isExist: payload.errorType !== "NOT_FOUND"
            };
          case "GET_SUCCESS":
            return {
              ...state,
              isLoading: false,
              isExist: true,
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
          default:
            return state;
        }
      },
      props => {
        const page = parseInt(props.queryParams.page) || 1;
        const perPage = 10;

        return {
          isLoading: true,
          isExist: true,
          data: [],
          pagination: {
            perPage,
            offset: getOffset(perPage, page),
            page,
            total: 0
          }
        };
      }
    ),
    withHandlers({
      getList: ({ dispatch, list: stateList }) => async () => {
        dispatch({ type: "GET_REQUEST" });
        try {
          const { list, records } = await apiGetList({
            ...stateList.pagination
          });
          dispatch({
            type: "GET_SUCCESS",
            payload: { list, total: records }
          });
        } catch (error) {
          dispatch({ type: "GET_FAILURE" });
          logger(error);
        }
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
        return props.list.pagination.page !== nextProps.list.pagination.page;
      },
      props => {
        props.getList();
      }
    ),
    branch(
      props => !props.list.isExist && !props.list.isLoading,
      renderComponent(NotFound)
    )
  )(Component);
};

function getOffset(perPage, page) {
  return perPage * page - perPage;
}

export default withPaginationList;
