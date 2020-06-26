import React, { useState, useEffect } from "react";
import { compose, withState, withHandlers, mapProps } from "recompose";
import { injectIntl } from "react-intl";

import logger from "services/logger";
import Modal from "components/modals/Modal";
import MultiLangContent from "components/MultiLangContent";
import ApiService from "services/api/ApiService";
import getServerFileUrl from "utils/getServerFileUrl";

function ModalEntities(props) {
  const {
    title,
    previewImagesName,
    entities,
    exceptValue,
    handleSelect
  } = props;

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.handleOpenModal}
      onRequestClose={props.onRequestClose}
    >
      <div className="popup popup--xs">
        <div className="popup__head">
          <div className="popup__title">{title}</div>
        </div>
        <div className="popup__body">
          <div className="select-list">
            {entities
              .filter(entity => entity.id !== exceptValue)
              .map(entity => (
                <button
                  key={entity.id}
                  type="button"
                  className="select-item"
                  onClick={() => handleSelect(entity)}
                >
                  {entity[previewImagesName].length > 0 && (
                    <span className="select-item__image">
                      <img
                        src={getServerFileUrl(entity[previewImagesName][0])}
                        alt=""
                      />
                    </span>
                  )}
                  <div className="select-item__title">
                    <MultiLangContent text={entity.title} />
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
      }
    </Modal>
  );
}

export default compose(
  injectIntl,
  withState("entities", "setEntities", []),
  withHandlers({
    handleOpenModal: props => async event => {
      try {
        const { list } = await props.apiGetList({ perPage: 9999 });
        props.setEntities(list);
      } catch (error) {
        logger(error);
      }
    },
    handleSelect: props => entity => {
      const { onSelect, onRequestClose } = props;
      onSelect(entity);
      onRequestClose();
    }
  }),
  mapProps(props => {
    return {
      ...props,
      entities: props.entities.filter(
        entity =>
          props.selectedEntities.find(
            selectedEntity => selectedEntity.id === entity.id
          ) == null
      )
    };
  })
)(ModalEntities);
