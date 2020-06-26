import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { animateScroll } from "react-scroll";

import Icon, { ICON_NAMES } from "components/Icon";
import "./style.scss";

class ScrollUp extends Component {
  isVisible() {
    const { windowScrollTop } = this.props;
    return windowScrollTop > window.innerHeight;
  }

  handleClick = event => {
    animateScroll.scrollToTop();
  };

  render() {
    return (
      <button
        type="button"
        className={classNames("scroll-up", {
          "scroll-up--hidden": !this.isVisible()
        })}
        onClick={this.handleClick}
      >
        Up
      </button>
    );
  }
}

export default connect(state => {
  return {
    windowScrollTop: 0
    // windowScrollTop: state.common.windowScrollTop
  };
})(ScrollUp);
