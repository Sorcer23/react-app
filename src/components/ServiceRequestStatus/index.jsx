import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import Icon, { ICON_NAMES } from "components/Icon";
import AppDataModule from "modules/appData";

function ServiceRequestStatus(props) {
  const { id, intl, status } = props;

  return (
    <div
      className={classNames("state", {
        "state--new": id === 0,
        "state--accepted": id === 1,
        "state--ongoing": id === "ongoing"
      })}
    >
      <Icon name={ICON_NAMES.document} className="state__icon" />
      <div className="state__title">
        {id === "ongoing"
          ? intl.formatMessage({ id: "ui.requests.status_ongoing" })
          : status.label}
      </div>
    </div>
  );
}

export default compose(
  connect((state, props) => {
    return {
      status: AppDataModule.listSelector(state)("statusesRequest")[
        "statusesRequest"
      ].find(s => s.value.toString() === props.id.toString())
    };
  }),
  injectIntl
)(ServiceRequestStatus);
