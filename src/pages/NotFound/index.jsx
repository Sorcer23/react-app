import React, { Component } from "react";
import { compose } from "recompose";
import { FormattedMessage } from "react-intl";

import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Button from "components/Button";
import img404 from "./404.png";
import "./style.scss";

class NotFound extends Component {
  render() {
    return <div className="page-body">404</div>;
  }
}

export default compose(passAuthUser, pageLayout())(NotFound);
