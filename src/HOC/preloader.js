import React, { Component } from "react";

import Preloader from "components/Preloader";

const preloader = WrappedComponent => {
  return class UpdatedComponent extends Component {
    getContainerStyle() {
      const { showLoader, disabled } = this.props;

      return {
        position: "relative",
        pointerEvents: showLoader || disabled ? "none" : "initial"
      };
    }

    getPreloader() {
      const { showLoader } = this.props;

      if (!showLoader) return null;

      return <Preloader />;
    }

    render() {
      const { showLoader, ...attr } = this.props;

      return (
        <WrappedComponent
          {...attr}
          preloaderContainerStyle={this.getContainerStyle()}
          preloader={this.getPreloader()}
        />
      );
    }
  };
};

export default preloader;
