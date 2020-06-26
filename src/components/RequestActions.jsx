import React, { Fragment } from "react";
import { compose, withHandlers, withState, withProps } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import logger from "services/logger";
import ApiService from "services/api/ApiService";
import { config as serviceRequestConfig } from "modules/serviceRequest";
import NotificationsModule from "modules/notifications";
import withModal from "HOC/withModal";
import withAcceptBid from "HOC/withAcceptBid";
import Button from "components/Button";
import ModalAction from "components/modals/ModalAction";
import ROUTES from "config/routes";
import history from "services/history";

function RequestActions(props) {
  const {
    intl,
    response,
    request,
    isCompliting,
    modals,
    isResponse,
    onAcceptBid,
    openModal,
    closeModal,
    onRequestClose,
    onRequestComplete
  } = props;

  return (
    <Fragment>
      <div className="request-actions row">
        {response.status === serviceRequestConfig.STATUSES.new && (
          <Fragment>
            {isResponse && (
              <div className="col-auto">
                <Button onClick={onAcceptBid}>
                  {intl.formatMessage({ id: "ui.actions.accept_bid" })}
                </Button>
              </div>
            )}
            <div className="col-auto">
              <Button onClick={() => openModal("successClose")} light>
                {intl.formatMessage({ id: "ui.actions.close_request" })}
              </Button>
            </div>
          </Fragment>
        )}
        {response.status === serviceRequestConfig.STATUSES.accepted && (
          <div className="col-auto">
            <Button showLoader={isCompliting} onClick={onRequestComplete}>
              {intl.formatMessage({ id: "ui.actions.complete_request" })}
            </Button>
          </div>
        )}
        {response.status === serviceRequestConfig.STATUSES.completed && (
          <div className="col-auto">
            <Button to={`${ROUTES.serviceRequestReview}/${request.id}`}>
              {intl.formatMessage({
                id:
                  request.review == null
                    ? "ui.actions.send_review"
                    : "ui.actions.resend_review"
              })}
            </Button>
          </div>
        )}
      </div>

      <ModalAction
        isOpen={modals["successClose"]}
        params={{
          type: "confirmation",
          message: intl.formatMessage({
            id: "ui.notifications.success.service_request_closed"
          }),
          onConfirm: () => onRequestClose(),
          onCancel: () => closeModal("successClose"),
          onAfterClose: () => closeModal("successClose")
        }}
      ></ModalAction>
    </Fragment>
  );
}

export default compose(
  withProps(props => {
    return { bid: props.response };
  }),
  withAcceptBid,
  injectIntl,
  connect(null, {
    notify: NotificationsModule.notify
  }),
  withModal("successClose", "sendReview"),
  withState("isCompliting", "setIsCompliting", false),
  withProps(props => {
    return {
      isResponse: props.response.request != null,
      request: props.response.request || props.response
    };
  }),
  withHandlers({
    onRequestClose: props => async () => {
      try {
        await ApiService.closeServiceRequest(props.request.id);
        props.closeModal("successClose");
        history.push(ROUTES.serviceRequestList);
      } catch (error) {
        logger(error);
      }
    },
    onRequestComplete: props => async () => {
      props.notify({
        view: "window",
        type: "confirmation",
        message: props.intl.formatMessage({
          id: "ui.notifications.confirmation.service_request_confirm"
        }),
        onConfirm: async () => {
          try {
            props.setIsCompliting(true);
            await ApiService.completeServiceRequest(props.request.id);
            props.setIsCompliting(false);
            history.push(`${ROUTES.serviceRequestReview}/${props.request.id}`);
          } catch (error) {
            props.setIsCompliting(false);
            logger(error);
          }
        }
      });
    }
  })
)(RequestActions);
