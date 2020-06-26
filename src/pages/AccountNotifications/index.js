import {
  compose,
  mapProps,
  withProps,
  withReducer,
  withHandlers,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";

import passAuthUser from "HOC/passAuthUser";
import pageLayout from "HOC/pageLayout";
import ApiService from "services/api";
import logger from "services/logger";
import AccountNotificationsModule from "modules/accountNotifications";
import AccountNotifications from "./AccountNotifications";

const INITIAL_NOTIFICATIONS = {
  list: [],
  isLoadingMore: false,
  isInitialLoading: false,
  pagination: {
    limit: 10,
    offset: 0,
    total: 0
  }
};

export default compose(
  withReducer(
    "notifications",
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
            list: payload.isInitialLoading
              ? payload.list
              : [...state.list, ...payload.list],
            pagination: {
              ...state.pagination,
              offset:
                (payload.isInitialLoading ? 0 : state.pagination.offset) +
                state.pagination.limit,
              total: payload.total
            }
          };
        }

        case "MAKE_SEEN": {
          return {
            ...state,
            list: state.list.map(note => {
              if (note.id === payload.id) return { ...note, seen: true };
              return note;
            })
          };
        }

        default:
          return state;
      }
    },
    INITIAL_NOTIFICATIONS
  ),
  withProps(props => {
    return {
      hasMore:
        !props.notifications.isLoadingMore &&
        !props.notifications.isInitialLoading &&
        props.notifications.pagination.offset <
          props.notifications.pagination.total
    };
  }),
  withHandlers({
    fetchList: ({
      dispatch,
      notifications: notificationsState
    }) => async isInitialLoading => {
      try {
        dispatch({ type: "FETCH_LIST_REQUEST", payload: { isInitialLoading } });
        const { notifications, count } = await ApiService.getNotifications(
          notificationsState.pagination.limit,
          isInitialLoading ? 0 : notificationsState.pagination.offset
        );
        dispatch({
          type: "FETCH_LIST_SUCCESS",
          payload: {
            list: notifications,
            total: parseInt(count),
            isInitialLoading
          }
        });
      } catch (error) {
        logger(error);
        dispatch({ type: "FETCH_LIST_FAILURE" });
      }
    },
    handleAction: ({ dispatch }) => async notification => {
      try {
        await ApiService.makeNotificationsSeen([notification.id]);
        dispatch({ type: "MAKE_SEEN", payload: { id: notification.id } });
      } catch (error) {
        logger(error);
      } finally {
        AccountNotificationsModule.effect(notification);
      }
    }
  }),
  withHandlers({
    onLoadMore: props => () => props.fetchList(),
    onRefresh: props => () => props.fetchList(true)
  }),
  withPropsOnChange([], props => {
    props.fetchList(true);
  }),
  injectIntl,
  passAuthUser,
  pageLayout()
)(AccountNotifications);
