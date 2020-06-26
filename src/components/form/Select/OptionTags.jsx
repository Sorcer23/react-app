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
import ModalModule, { MODAL_NAMES } from "modules/modal";
import OptionTag from "./OptionTag";
import ModalSelectTags from "./ModalSelectTags";

function OptionTags(props) {
  const { intl, value, isModalOpen, setModalOpen, handleDelete } = props;

  const listNode = useRef(null);

  if (value == null || value.length === 0) return null;

  const moreTagsNumber = value.length - 1;

  return (
    <div className="select-tags">
      <ModalSelectTags
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        {...props}
      />

      <div ref={listNode} className="select-tags__list">
        <OptionTag tag={value[0]} onDelete={handleDelete} />
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

export default compose(
  withModal(),
  withHandlers({
    handleDelete: props => deletedOption => {
      const { value, onChange } = props;

      onChange(value.filter(option => option.value !== deletedOption.value));
    }
  }),
  injectIntl
)(OptionTags);
