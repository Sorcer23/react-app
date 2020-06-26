import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import { compose } from "recompose";

import ROUTES from "config/routes";

function RegisterPhone(props) {
  const { intl } = props;
  return (
    <Fragment>
      <h2 className="title title--light">
        {intl.formatMessage({ id: "ui.auth.step1_left_title" })}
      </h2>
      <h5 className="authorization__subtitle">
        {intl.formatMessage({ id: "ui.auth.step1_left_text" })}
      </h5>
      <Link to={ROUTES.signin} className="btn">
        {intl.formatMessage({ id: "ui.actions.sign_in" })}
      </Link>
    </Fragment>
  );
}

export default compose(injectIntl)(RegisterPhone);
