import store from "store";
import logger from "services/logger";
import history from "services/history";
import ModalModule, { MODAL_NAMES } from "modules/modal";
import ROUTES from "config/routes";

class AccountNotifications {
  effect(notification) {
    if (notification == null) {
      logger(`The notification is empty`);
      return;
    }

    console.log(notification);

    switch (notification.type) {
      case "post_published": {
        history.push(`${ROUTES.post}/${notification.entityId}`);
        break;
      }
      case "post_rejected": {
        store.dispatch(
          ModalModule.show({
            name: MODAL_NAMES.rejectReason,
            params: {
              content: notification.content,
              editUrl: `${ROUTES.postEdit}/${notification.entityId}`
            }
          })
        );
        break;
      }
      case "post_removed": {
        break;
      }
      case "product_published": {
        history.push(`${ROUTES.product}/${notification.entityId}`);
        break;
      }
      case "product_rejected": {
        store.dispatch(
          ModalModule.show({
            name: MODAL_NAMES.rejectReason,
            params: {
              content: notification.content,
              editUrl: `${ROUTES.productEdit}/${notification.entityId}`
            }
          })
        );
        break;
      }
      case "product_removed": {
        break;
      }
      case "service_published": {
        history.push(`${ROUTES.service}/${notification.entityId}`);
        break;
      }
      case "service_rejected": {
        store.dispatch(
          ModalModule.show({
            name: MODAL_NAMES.rejectReason,
            params: {
              content: notification.content,
              editUrl: `${ROUTES.serviceEdit}/${notification.entityId}`
            }
          })
        );
        break;
      }
      case "service_removed": {
        break;
      }
      case "service_provider_rejected":
      case "service_provider_published": {
        history.push(ROUTES.account);
        break;
      }

      case "request_created": {
        history.push(ROUTES.serviceRequestList);
        break;
      }

      case "request_edited": {
        history.push(
          `${ROUTES.serviceRequestViewByProvider}/${notification.entityId}`
        );
        break;
      }

      case "response_created":
      case "response_edited": {
        history.push(`${ROUTES.serviceResponseView}/${notification.entityId}`);
        break;
      }

      default: {
        logger(`The notification type ${notification.type} is not declared`);
      }
    }
  }
}

export default new AccountNotifications();
