import Notifications from "react-notification-system-redux";

import ModalModule, { MODAL_NAMES } from "modules/modal";

const notify = ({
  message,
  okLabel,
  type = "info",
  view,
  onConfirm,
  onAfterClose
}) => {
  if (view === "window") {
    return ModalModule.show({
      name: MODAL_NAMES.notice,
      params: { message, okLabel, type, onAfterClose, onConfirm }
    });
  }

  return Notifications[type]({ message });
};

export default {
  notify
};
