import React, { Fragment } from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

import ROUTES from "config/routes";

function Email(props) {
  const { intl } = props;
  return (
    <Fragment>
      <h5 className="authorization__subtitle vertical-center">
        {intl.formatMessage({ id: "ui.auth.step2_left_text_email" })}
      </h5>
    </Fragment>
  );
}

export default compose(injectIntl)(Email);
