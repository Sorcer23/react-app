import onClickOutside from "react-onclickoutside";
import { injectIntl } from "react-intl";
import {
  compose,
  withReducer,
  withHandlers,
  withPropsOnChange,
  withProps
} from "recompose";

import ApiService from "services/api";
import logger from "services/logger";
import AccountNotifications from "modules/accountNotifications";
import NotificationsDropdown from "./NotificationsDropdown";

const INITIAL_NOTIFICATIONS = {
  isListViisble: false,
  list: [],
  isLoading: false,
  pagination: {
    limit: 8,
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
        case "SHOW_LIST": {
          return {
            ...state,
            isListViisble: true
          };
        }

        case "HIDE_LIST": {
          return INITIAL_NOTIFICATIONS;
        }

        case "FETCH_LIST_REQUEST": {
          return {
            ...state,
            isLoading: true
          };
        }

        case "FETCH_LIST_FAILURE": {
          return {
            ...state,
            isLoading: false
          };
        }

        case "FETCH_LIST_SUCCESS": {
          return {
            ...state,
            isLoading: false,
            list: [...state.list, ...payload.list],
            pagination: {
              ...state.pagination,
              offset: state.pagination.offset + state.pagination.limit,
              total: payload.total
            }
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
        !props.notifications.isLoading &&
        props.notifications.pagination.offset <
          props.notifications.pagination.total
    };
  }),
  withHandlers({
    showList: ({ dispatch }) => () => {
      dispatch({ type: "SHOW_LIST" });
    },
    hideList: ({ dispatch }) => () => {
      dispatch({ type: "HIDE_LIST" });
    }
  }),
  withHandlers({
    fetchList: ({
      dispatch,
      notifications: notificationsState
    }) => async () => {
      try {
        dispatch({ type: "FETCH_LIST_REQUEST" });
        const { notifications, count } = await ApiService.getNotifications(
          notificationsState.pagination.limit,
          notificationsState.pagination.offset
        );
        dispatch({
          type: "FETCH_LIST_SUCCESS",
          payload: { list: notifications, total: parseInt(count) }
        });
      } catch (error) {
        logger(error);
        dispatch({ type: "FETCH_LIST_FAILURE" });
      }
    },
    handleAction: props => async notification => {
      try {
        await ApiService.makeNotificationsSeen([notification.id]);
        props.hideList();
      } catch (error) {
        logger(error);
      } finally {
        AccountNotifications.effect(notification);
      }
    }
  }),
  withPropsOnChange(
    (props, nextProps) => {
      return (
        !props.notifications.isListViisble &&
        nextProps.notifications.isListViisble
      );
    },
    props => {
      if (props.notifications.isListViisble) {
        props.fetchList();
      }
    }
  ),
  injectIntl
)(
  onClickOutside(NotificationsDropdown, {
    handleClickOutside: () => NotificationsDropdown.handleClickOutside
  })
);
