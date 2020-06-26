import { createRef } from "react";
import {
  compose,
  setPropTypes,
  withState,
  withHandlers,
  withReducer,
  withProps
} from "recompose";
import PropTypes from "prop-types";
import debounceHandler from "@hocs/debounce-handler";
import { injectIntl } from "react-intl";

import logger from "services/logger";
import Search from "./Search";

const MIN_QUERY_LENGTH = 2;
const INITIAL_MATCHES = {
  list: [],
  isLoading: false,
  isLoaded: false,
  isFocused: false
};

export default compose(
  injectIntl,
  setPropTypes({
    apiLoadResults: PropTypes.func.isRequired,
    onSelectQuery: PropTypes.func.isRequired
  }),
  withProps({
    inputRef: createRef()
  }),
  withState("query", "changeQuery", ""),
  withReducer(
    "matches",
    "dispatch",
    (state, action) => {
      const { payload } = action;
      switch (action.type) {
        case "SET_FOCUS": {
          return {
            ...state,
            isFocused: payload.isFocused
          };
        }

        case "GET_MATCHES_REQUEST": {
          return {
            ...state,
            isLoading: true,
            isLoaded: false
          };
        }

        case "GET_MATCHES_FAILURE": {
          return INITIAL_MATCHES;
        }

        case "GET_MATCHES_SUCCESS": {
          return {
            ...state,
            list: payload.list,
            isLoading: false,
            isLoaded: true
          };
        }

        case "RESET": {
          return INITIAL_MATCHES;
        }
      }
    },
    INITIAL_MATCHES
  ),
  withHandlers({
    handleLoadResults: props => async value => {
      const { dispatch } = props;

      if (props.query.length < MIN_QUERY_LENGTH) return;

      dispatch({ type: "GET_MATCHES_REQUEST" });
      try {
        const { list } = await props.apiLoadResults(value);
        dispatch({ type: "GET_MATCHES_SUCCESS", payload: { list } });
      } catch (error) {
        logger(error);
        dispatch({ type: "GET_MATCHES_FAILURE" });
      }
    },
    handleSelectQuery: props => query => {
      props.onSelectQuery(query || props.query);
      props.inputRef.current.blur();
      props.dispatch({ type: "RESET" });
      props.changeQuery("");
    },
    reset: props => () => {
      props.dispatch({ type: "RESET" });
      props.changeQuery("");
    }
  }),
  debounceHandler("handleLoadResults", 400),
  withHandlers({
    handleInputChange: props => event => {
      const { value } = event.target;
      props.changeQuery(value);
      props.handleLoadResults(value);
    },
    handleInputFocus: props => () => {
      props.dispatch({ type: "SET_FOCUS", payload: { isFocused: true } });
    },
    handleInputBlur: props => () => {
      props.dispatch({ type: "SET_FOCUS", payload: { isFocused: false } });
    },
    handleSelectMatch: props => query => () => {
      props.changeQuery(query.title);
      props.handleSelectQuery(query);
    }
  })
)(Search);
