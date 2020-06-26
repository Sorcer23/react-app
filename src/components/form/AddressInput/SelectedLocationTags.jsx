import React, {
  Component,
  useRef,
  useEffect,
  useCallback,
  Fragment
} from "react";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import {
  compose,
  withHandlers,
  withStateHandlers,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";

import withModal from "HOC/withModal";
import SelectedLocationTag from "./SelectedLocationTag";
import ModalSelectedLocations from "./ModalSelectedLocations";

function SelectedLocationTags(props) {
  const { intl, locations, isModalOpen, setModalOpen, onDelete } = props;

  const listNode = useRef(null);

  if (locations == null || locations.length === 0) return null;

  const moreTagsNumber = locations.length - 1;

  return (
    <div className="select-tags">
      <ModalSelectedLocations
        isOpen={isModalOpen}
        locations={locations}
        onRequestClose={() => setModalOpen(false)}
        onDelete={onDelete}
      />

      <div ref={listNode} className="select-tags__list">
        <SelectedLocationTag location={locations[0]} onDelete={onDelete} />
      </div>
      {moreTagsNumber > 0 && (
        // TODO: add intl
        <button
          type="button"
          className="show-all-tags"
          onClick={() => setModalOpen(true)}
        >
          + {moreTagsNumber} more
        </button>
      )}
    </div>
  );
}

export default compose(withModal(), injectIntl)(SelectedLocationTags);
