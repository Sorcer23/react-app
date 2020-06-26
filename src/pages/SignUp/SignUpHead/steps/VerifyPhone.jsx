import React, { Fragment } from "react";
import { injectIntl } from "react-intl";
import { compose } from "recompose";

function VerifyPhone(props) {
  const { intl } = props;
  return (
    <Fragment>
      <div className="column-head"></div>
      <div className="column-body">
        <h5 className="authorization__subtitle vertical-center">
          {intl.formatMessage({ id: "ui.auth.step2_left_text" })}
        </h5>
      </div>
    </Fragment>
  );
}

export default compose(injectIntl)(VerifyPhone);
