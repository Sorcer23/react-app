import React, { Fragment } from "react";
import classNames from "classnames";

import Icon, { ICON_NAMES } from "components/Icon";
import formatDateTime from "utils/formatDateTime";
import Button from "components/Button";
import Preloader from "components/Preloader";

function AccountNotifications(props) {
  const {
    intl,
    hasMore,
    notifications,
    handleAction,
    onLoadMore,
    onRefresh
  } = props;

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <div className="data__head row">
            <div className="col-auto">
              <h1 className="section-title">
                {intl.formatMessage({ id: "ui.navigation.notifications" })}
              </h1>
            </div>
            <div className="col-auto">
              <button
                className="button-refresh-chat"
                type="button"
                onClick={onRefresh}
              >
                <Icon name={ICON_NAMES.refresh} />
              </button>
            </div>
          </div>

          {notifications.isInitialLoading ? (
            <Preloader />
          ) : (
            <div className="data__body">
              {notifications.list.map(note => (
                <li
                  key={note.id}
                  className={classNames("notification-info", {
                    "notification-info--not-seen": !note.seen
                  })}
                  role="button"
                  tabIndex="0"
                  onClick={() => handleAction(note)}
                >
                  <span className="notification-info__text">
                    {note.message}
                  </span>
                  <span className="notification-info__date">
                    {formatDateTime(note.createdAt)}
                  </span>
                </li>
              ))}

              {(hasMore || notifications.isLoadingMore) && (
                <div className="row justify-content-center">
                  <Button
                    onClick={onLoadMore}
                    showLoader={notifications.isLoadingMore}
                    size="md"
                    light
                  >
                    {intl.formatMessage({ id: "ui.actions.load_more" })}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AccountNotifications;
