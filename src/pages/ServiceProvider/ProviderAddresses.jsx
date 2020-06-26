import React, { Fragment } from "react";

import withModal from "HOC/withModal";
import Icon, { ICON_NAMES } from "components/Icon";
import ModalSelectedLocations from "components/form/AddressInput/ModalSelectedLocations";

function ProviderAddresses(props) {
  const { locations, isModalOpen, setModalOpen } = props;

  if (locations == null || locations.length === 0) return null;

  return (
    <Fragment>
      <button
        type="button"
        className="social__link"
        onClick={() => setModalOpen(true)}
      >
        <Icon name={ICON_NAMES.pin} />
      </button>
      <ModalSelectedLocations
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        locations={locations}
      />
    </Fragment>
  );
}

export default withModal()(ProviderAddresses);
