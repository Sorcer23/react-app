import React from "react";
import { compose, lifecycle, withReducer, withHandlers } from "recompose";
import { debounce, throttle } from "throttle-debounce";

export default function withCheckScroll(Component) {
  return compose(
    withReducer(
      "scrollData",
      "dispatch",
      (state, action) => {
        const { payload } = action;
        switch (action.type) {
          case "BEGIN_SCROLL":
            return { ...state, isScrolling: true };
          case "END_SCROLL":
            return {
              ...state,
              isScrolling: false,
              scrollTop: payload.scrollTop
            };
          default:
            return state;
        }
      },
      {
        isScrolling: false,
        scrollTop: window.scrollY
      }
    ),
    lifecycle({
      componentDidMount() {
        this.handleBeginScroll = debounce(350, true, event => {
          this.props.dispatch({ type: "BEGIN_SCROLL" });
        });

        this.handleEndScroll = debounce(250, event => {
          this.props.dispatch({
            type: "END_SCROLL",
            payload: { scrollTop: window.scrollY }
          });
        });

        window.addEventListener("scroll", this.handleBeginScroll);
        window.addEventListener("scroll", this.handleEndScroll);
      },
      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleBeginScroll);
        window.removeEventListener("scroll", this.handleEndScroll);
      }
    })
  )(Component);
}
