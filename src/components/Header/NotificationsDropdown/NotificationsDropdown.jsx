import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import classNames from "classnames";

import Icon, { ICON_NAMES } from "components/Icon";
import NotificationsButton from "./NotificationsButton";

function NotificationsDropdown(props) {
  const { intl, hasMore, handleAction, fetchList, hideList, showList } = props;
  const { isLoading, isListViisble, list } = props.notifications;

  NotificationsDropdown.handleClickOutside = () => hideList();

  const menuListRef = useRef(null);

  return (
    <div className="menu-link header-dropdown">
      <NotificationsButton
        onClick={() => (isListViisble ? hideList() : showList())}
      />
      <div ref={menuListRef} className="header-dropdown__menu">
        {isListViisble && (
          <InfiniteScroll
            className="header-dropdown__menu-list"
            pageStart={0}
            hasMore={hasMore}
            loadMore={fetchList}
            element="ul"
            useWindow={false}
            getScrollParent={() => menuListRef.current}
            threshold={50}
          >
            {list.map(note => (
              <li
                key={note.id}
                className={classNames("header-dropdown__menu-item", {
                  "header-dropdown__menu-item--not-seen": !note.seen
                })}
                role="button"
                tabIndex="0"
                onClick={() => handleAction(note)}
              >
                {note.message}
              </li>
            ))}
            {!isLoading && list.length === 0 && (
              <li className="header-dropdown__menu-item">
                {intl.formatMessage({ id: "ui.common.not_found" })}
              </li>
            )}
            {isLoading && (
              <li className="header-dropdown__menu-item">
                {intl.formatMessage({
                  id: "ui.common.loading"
                })}
                ...
              </li>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default NotificationsDropdown;
