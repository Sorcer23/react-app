import React from "react";
import classNames from "classnames";
import moment from "moment";

import formatDateTime from "utils/formatDateTime";

function Message(props) {
  const { message, isOwn } = props;

  return (
    <div
      className={classNames("chat-message", {
        "chat-message--response": isOwn
      })}
    >
      <p className="chat-message__text">{message.message}</p>
      <p className="chat-message__time">{formatDateTime(message.updatedAt)}</p>
    </div>
  );
}

export default Message;
