import {
  compose,
  withHandlers,
  withPropsOnChange,
  withReducer,
  withProps,
  branch,
  renderNothing
} from "recompose";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import logger from "services/logger";
import ApiService from "services/api";
import { selectors as accountSelectors } from "modules/account";
import { config as serviceRequestConfig } from "modules/serviceRequest";
import Chat from "./Chat";

const MESSAGES_LIMIT = 10;

const INITIAL_MESSAGES = {
  list: [],
  records: 0,
  isInitialLoading: false,
  isNewLoading: false,
  isLoaded: false
};

export default compose(
  branch(props => {
    return (
      props.data.request == null ||
      (props.data.request.status !== serviceRequestConfig.STATUSES.accepted &&
        props.data.request.status !== serviceRequestConfig.STATUSES.new)
    );
  }, renderNothing),
  connect(state => {
    return {
      userId: state.account.user.id,
      isServiceProvider: accountSelectors.isServiceProvider(state),
      events: state.events
    };
  }),
  withReducer(
    "messages",
    "dispatch",
    (state, action) => {
      const { payload } = action;

      switch (action.type) {
        case "GET_INITIAL_MESSAGES_REQUEST": {
          return {
            ...state,
            isInitialLoading: payload.isInitial,
            isLoaded: false
          };
        }

        case "GET_INITIAL_MESSAGES_FAILURE": {
          return INITIAL_MESSAGES;
        }

        case "GET_INITIAL_MESSAGES_SUCCESS": {
          return {
            ...state,
            list: payload.list,
            records: payload.records,
            isInitialLoading: false,
            isLoaded: true
          };
        }

        case "GET_PREV_MESSAGES_REQUEST": {
          return {
            ...state,
            isNewLoading: true
          };
        }
        case "GET_PREV_MESSAGES_FAILURE": {
          return {
            ...state,
            isNewLoading: false
          };
        }
        case "GET_PREV_MESSAGES_SUCCESS": {
          return {
            ...state,
            list: [...state.list, ...payload.list],
            records: payload.records,
            isNewLoading: false
          };
        }

        case "GET_NEW_MESSAGE_SUCCESS": {
          return {
            ...state,
            list: [...payload.list, ...state.list],
            records: payload.records
          };
        }

        case "SEND_MESSAGE_SUCCESS": {
          return {
            ...state,
            list: [payload, ...state.list]
          };
        }
      }
    },
    INITIAL_MESSAGES
  ),
  withHandlers({
    getInitialMessages: ({ data, messages, dispatch }) => async isInitial => {
      try {
        dispatch({
          type: "GET_INITIAL_MESSAGES_REQUEST",
          payload: { isInitial }
        });
        const { list, records } = await ApiService.serviceRequestGetMessages(
          data.id,
          {
            limit: MESSAGES_LIMIT,
            offset: 0
          }
        );
        dispatch({
          type: "GET_INITIAL_MESSAGES_SUCCESS",
          payload: { list, records }
        });
      } catch (error) {
        dispatch({ type: "GET_INITIAL_MESSAGES_FAILURE" });
        logger(error);
      }
    },
    getNewMessage: ({ data, dispatch }) => async () => {
      try {
        const { list, records } = await ApiService.serviceRequestGetMessages(
          data.id,
          {
            limit: 1,
            offset: 0
          }
        );
        dispatch({
          type: "GET_NEW_MESSAGE_SUCCESS",
          payload: { list, records }
        });
      } catch (error) {
        logger(error);
      }
    }
  }),
  withHandlers({
    onMessageSent: ({ dispatch, data, userId }) => async message => {
      if (message.length === 0) return;

      try {
        await ApiService.serviceRequestSendMessage(data.id, message);
        dispatch({
          type: "SEND_MESSAGE_SUCCESS",
          payload: {
            message,
            id: uuid(),
            date: new Date(),
            userId
          }
        });
      } catch (error) {
        logger(error);
      }
    },
    onRefresh: props => () => {
      props.getInitialMessages();
    },
    // load more messages by scroll
    onScroll: ({ data, messages, dispatch }) => async event => {
      if (
        event.target.scrollTop === 0 &&
        !messages.isNewLoading &&
        messages.list.length < messages.records
      ) {
        try {
          dispatch({
            type: "GET_PREV_MESSAGES_REQUEST"
          });

          const { list, records } = await ApiService.serviceRequestGetMessages(
            data.id,
            {
              limit: MESSAGES_LIMIT,
              offset: messages.list.length
            }
          );
          dispatch({
            type: "GET_PREV_MESSAGES_SUCCESS",
            payload: { list, records }
          });
        } catch (error) {
          dispatch({
            type: "GET_PREV_MESSAGES_FAILURE"
          });
          logger(error);
        }
      }
    }
  }),
  withPropsOnChange(
    (props, nextProps) => {
      return props.data.id !== nextProps.data.id;
    },
    props => {
      props.getInitialMessages(true);
    }
  ),
  withPropsOnChange(["events"], ({ events, data, getNewMessage, ...props }) => {
    if (events.list.length === 0) return;

    const lastEvent = events.list[events.list.length - 1];

    if (
      lastEvent.action === "new_message" &&
      lastEvent.response_id.toString() === data.id.toString()
    ) {
      getNewMessage();
    }
  })
)(Chat);
