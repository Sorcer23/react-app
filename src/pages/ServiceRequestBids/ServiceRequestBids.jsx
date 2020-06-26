import React from "react";

import Preloader from "components/Preloader";
import Button from "components/Button";
import Bid from "./Bid";

const ServiceRequestBids = props => {
  const { intl, list, hasMore, acceptedBid, onLoadMore } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          {list.data.length !== 0 && (
            <div className="title">
              {intl.formatMessage({ id: "ui.navigation.bids" })}
            </div>
          )}

          {!list.isInitialLoading &&
            !list.isLoadingMore &&
            list.data.length === 0 && (
              <div className="title">
                {intl.formatMessage({ id: "ui.requests.no_bids" })}
              </div>
            )}

          {list.isInitialLoading ? (
            <Preloader />
          ) : (
            <section className="bids-list">
              <div className="row">
                {acceptedBid != null && list.data.length ? (
                  <Bid
                    bid={list.data.find(request => request.id === acceptedBid)}
                  />
                ) : (
                  list.data.map(bid => (
                    <Bid key={bid.id} bid={bid} onAccept={props.getList} />
                  ))
                )}
              </div>

              {(hasMore || list.isLoadingMore) && (
                <div className="row justify-content-center">
                  <Button
                    onClick={onLoadMore}
                    showLoader={list.isLoadingMore}
                    size="md"
                    light
                  >
                    {intl.formatMessage({ id: "ui.actions.load_more" })}
                  </Button>
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
};

export default ServiceRequestBids;
