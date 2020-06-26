import { compose, withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import ApiService from "services/api/ApiService";
import logger from "services/logger";
import NotificationsModule from "modules/notifications";
import history from "services/history";
import ROUTES from "config/routes";

function withAcceptBid(Component) {
  return compose(
    injectIntl,
    connect(null, {
      notify: NotificationsModule.notify
    }),
    withState("isAccepting", "setAccepting", false),
    withHandlers({
      onSuccessAccept: ({ bid }) => () => {
        history.push(`${ROUTES.serviceResponseView}/${bid.id}`, {
          reloadRoute: history.location.state
            ? !history.location.state.reloadRoute
            : true
        });
      }
    }),
    withHandlers({
      acceptBid: ({
        intl,
        bid,
        setAccepting,
        notify,
        onSuccessAccept,
        ...props
      }) => async () => {
        try {
          setAccepting(true);

          await ApiService.acceptServiceRequestBid(bid.id);

          setTimeout(() => {
            notify({
              view: "window",
              type: "success",
              message: intl.formatMessage({
                id: "ui.notifications.success.service_request_accept_bid"
              }),
              onAfterClose: onSuccessAccept
            });
          });
        } catch (error) {
          logger(error);
        } finally {
          setAccepting(false);
        }
      }
    }),
    withHandlers({
      onAcceptBid: ({ intl, notify, acceptBid }) => async () => {
        notify({
          view: "window",
          type: "confirmation",
          message: intl.formatMessage({
            id: "ui.notifications.confirmation.service_request_accept_bid"
          }),
          onConfirm: acceptBid
        });
      }
    })
  )(Component);
}

export default withAcceptBid;
