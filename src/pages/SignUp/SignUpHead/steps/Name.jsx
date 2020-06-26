import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import { compose } from "recompose";

import ROUTES from "config/routes";

function StepName(props) {
  const { intl } = props;
  return (
    <Fragment>
      <h5 className="authorization__subtitle vertical-center">
        {intl.formatMessage({ id: "ui.auth.step4_left_text" })}
      </h5>
    </Fragment>
  );
}

export default compose(injectIntl)(StepName);
