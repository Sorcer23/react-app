import React from "react";
import { connect } from "react-redux";

import Preloader from "components/Preloader";

function PagePreloader(props) {
  const { connected, isLoading } = props;

  if (connected && !isLoading) return null;

  return (
    <div className="page-preloader">
      <Preloader />
    </div>
  );
}

export default connect(state => {
  return {
    isLoading: state.common.isPageLoading
  };
})(PagePreloader);
