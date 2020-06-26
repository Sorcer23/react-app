import React from "react";
import PropTypes from "prop-types";

import Header from "components/Header";
import Footer from "components/Footer";

const DEFAULT_OPTIONS = {
  withHeader: true,
  withFooter: true
};

const pageLayout = options => Component => {
  return function(props) {
    const config = {
      ...DEFAULT_OPTIONS,
      ...options
    };
    const { withHeader, withFooter } = config;

    return (
      <div className="wrapper">
        {withHeader && <Header />}
        <Component {...props} />
        {withFooter && <Footer />}
      </div>
    );
  };
};

export default pageLayout;
