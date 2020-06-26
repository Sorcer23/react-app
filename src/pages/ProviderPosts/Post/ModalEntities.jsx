import React, { useState, useEffect } from "react";
import { compose, withState, withHandlers, mapProps } from "recompose";
import { injectIntl } from "react-intl";

import logger from "services/logger";
import Modal from "components/modals/Modal";
import MultiLangContent from "components/MultiLangContent";
import getServerFileUrl from "utils/getServerFileUrl";

function ModalEntities(props) {
  const { intl, entities } = props;

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.handleOpenModal}
      onRequestClose={props.onRequestClose}
    >
      <div className="popup popup--xs">
        {/* <div className="popup__head">
          <div className="popup__title">
            
          </div>
        </div> */}
        <div className="popup__body">
          <div className="select-list">
            {entities.map(entity => (
              <div key={entity.id} className="select-item">
                {entity.images.length > 0 && (
                  <span className="select-item__image">
                    <img src={getServerFileUrl(entity.images[0])} alt="" />
                  </span>
                )}
                <div className="select-item__title">
                  <MultiLangContent text={entity.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      }
    </Modal>
  );
}

export default compose(
  withState("entities", "setEntities", []),
  withHandlers({
    handleOpenModal: props => async () => {
      try {
        const { post } = await props.apiGetPost(props.postId);
        props.setEntities(post[props.entity]);
      } catch (error) {
        logger(error);
      }
    }
  }),
  injectIntl
)(ModalEntities);
