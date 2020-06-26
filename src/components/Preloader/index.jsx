import React from "react";

import "./style.scss";

const Preloader = props => {
  return (
    <span className="preloader-overlay">
      <span className="preloader-spinner"></span>
    </span>
  );
};

export default Preloader;
