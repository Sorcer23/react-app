import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import MultiLangContent from "components/MultiLangContent";
import Preloader from "components/Preloader";
import MessageForm from "./MessageForm";
import Message from "./Message";

function Chat(props) {
  const { serviceProvider, request } = props.data;
  const {
    userId,
    messages,
    onMessageSent,
    onRefresh,
    isServiceProvider,
    onScroll
  } = props;

  return (
    <div className="chat">
      <div className="chat-header">
        {/* <button className="button-back" type="button">
          <Icon name={ICON_NAMES.arrowLeft} />
        </button> */}
        <div className="chat-header__title">
          <MultiLangContent
            text={
              userId === request.userId
                ? serviceProvider.businessName
                : request.user.firstName + " " + request.user.lastName
            }
          />
        </div>
        <button
          className="button-refresh-chat"
          type="button"
          onClick={onRefresh}
        >
          <Icon name={ICON_NAMES.refresh} />
        </button>
      </div>
      {/* <div className="chat-info">
        <div className="chat-date-wrap">
          <div className="chat-date">April, 03 2019</div>
        </div>
      </div> */}
      <div className="chat-messages" onScroll={onScroll}>
        {!messages.isLoading &&
          messages.list.map(message => (
            <Message
              key={message.id}
              message={message}
              isOwn={userId === message.userId}
            />
          ))}

        {messages.isLoading && <Preloader />}
      </div>
      <div className="chat-footer">
        <MessageForm onSubmit={onMessageSent} />
      </div>
    </div>
  );
}

export default Chat;
