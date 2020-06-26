import React, { useEffect, useState } from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import ApiService from "services/api";
import logger from "services/logger";

function NotificationsButton(props) {
  const [unreadNumber, setUnreadNumber] = useState(0);
  const { onClick } = props;

  useEffect(() => {
    async function fetchUnreadNumber() {
      try {
        const { notSeen } = await ApiService.getNotifications();
        setUnreadNumber(parseInt(notSeen));
      } catch (error) {
        logger(error);
      }
    }

    fetchUnreadNumber();
  }, []);

  return (
    <button
      type="button"
      className="notifications-btn button-menu"
      onClick={onClick}
    >
      <Icon name={ICON_NAMES.bell} />
      {unreadNumber ? (
        <span className="notifications-btn__number">
          {unreadNumber > 99 ? "99" : unreadNumber}
        </span>
      ) : null}
    </button>
  );
}

export default NotificationsButton;
