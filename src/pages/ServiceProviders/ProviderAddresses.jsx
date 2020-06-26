import React, { Fragment } from "react";

import withModal from "HOC/withModal";
import Icon, { ICON_NAMES } from "components/Icon";

function ProviderAddresses(props) {
  const { locations } = props;

  if (locations == null || locations.length === 0) return null;

  const locationAddresses = locations.map(address => address.location);

  return (
    <Fragment>
      <div className="product-card__addresses">
        <Icon className="product-card__pin-icon" name={ICON_NAMES.pin} />
        {locationAddresses[0]}
      </div>
      {locationAddresses.length > 1 && (
        <span className="button-more">
          +{locationAddresses.length - 1} More
        </span>
      )}
    </Fragment>
  );
}

export default withModal()(ProviderAddresses);
