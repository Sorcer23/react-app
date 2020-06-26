import React from "react";
import classNames from "classnames";

import { config as accountConfig } from "modules/account";
import AppDataText from "components/AppDataText";

function ProviderStatus(props) {
  const { status } = props;

  if (status == null) return null;

  return (
    <span
      className={classNames("provider-status", {
        "provider-status--requested":
          status === accountConfig.PROVIDER_STATUSES.requested,
        "provider-status--rejected":
          status === accountConfig.PROVIDER_STATUSES.rejected,
        "provider-status--approved":
          status === accountConfig.PROVIDER_STATUSES.approved
      })}
    >
      <AppDataText id="statusSp" value={status.toString()} />
    </span>
  );
}

export default ProviderStatus;
