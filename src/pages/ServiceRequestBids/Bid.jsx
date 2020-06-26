import React from "react";
import { injectIntl } from "react-intl";
import { compose, withHandlers, withState } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Rating from "components/Rating";
import LinesEllipsis from "components/LinesEllipsis";
import formatDate from "utils/formatDate";
import ApiService from "services/api/ApiService";
import logger from "services/logger";
import ROUTES from "config/routes";
import withAcceptBid from "HOC/withAcceptBid";
import MultiLangContent from "components/MultiLangContent";

function Bid(props) {
  const { intl, bid, isAccepting, onAcceptBid } = props;

  return (
    <div className="col-md-6 col-lg-4 bid-card-wrap">
      <div className="bid-card">
        <div className="bid-card__head">
          <Link
            to={`${ROUTES.serviceProvider}/${bid.serviceProvider.id}`}
            className="bid-card__image-wrap"
          >
            <img
              className="bid-card__image"
              src="/img/temp/request-details.jpg"
              alt=""
            />
          </Link>
          <div className="bid-card__info">
            <Link
              to={`${ROUTES.serviceProvider}/${bid.serviceProvider.id}`}
              className="bid-card__info-head"
            >
              <span className="bid-card__title">
                <MultiLangContent text={bid.serviceProvider.businessName} />
              </span>
              <Rating value={bid.serviceProvider.rating} />
            </Link>
            <div className="bid-status">
              <Icon name={ICON_NAMES.wallet} className="bid-status__icon" />
              <div className="bid-status__title">
                {intl.formatMessage({ id: "ui.fields.accepted_bid" })}:
              </div>
              <div className="bid-status__value">{`QRS ${bid.priceMax}`}</div>
            </div>
          </div>
        </div>
        <div className="bid-card__body">
          <div className="bid-card__description-list">
            <div className="bid-card__description-item">
              <LinesEllipsis html={`<b>Message:</b> ${bid.description}`} />
            </div>
            <div className="bid-card__description-item">
              <b>{intl.formatMessage({ id: "ui.fields.valid_till" })}: </b>{" "}
              {formatDate(bid.offerExpired)}
            </div>
          </div>
          <div className="bid-card__actions-panel">
            <Link
              to={`${ROUTES.serviceResponseView}/${bid.id}`}
              className="link link--color-site"
            >
              <span className="link__icon">
                <Icon name={ICON_NAMES.chat} />
              </span>
              <span className="link__title">
                {intl.formatMessage({
                  id: "ui.actions.chat"
                })}
              </span>
            </Link>
            {/* {bid.attachments.length > 0 && (
              <button
                type="button"
                className="link link--color-site"
                onClick={() => downloadZipWithFiles(bid.attachments)}
              >
                <span className="link__icon">
                  <Icon name={ICON_NAMES.downloadStrict} />
                </span>
                <span className="link__title">
                  {intl.formatMessage({
                    id: "ui.actions.samples"
                  })}
                </span>
              </button>
            )} */}
          </div>
          {bid.status === 0 && (
            <Button
              className="btn--width-100"
              showLoader={isAccepting}
              onClick={onAcceptBid}
            >
              {intl.formatMessage({ id: "ui.actions.accept_bid" })}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default compose(
  injectIntl,
  withAcceptBid
  // withState('isAccepting', 'setAccepting', false),
  // withHandlers({
  //   acceptBid: ({ bid, setAccepting, onAccept }) => async () => {
  //     try {
  //       setAccepting(true);
  //       await ApiService.acceptServiceRequestBid(bid.id);
  //       onAccept();
  //     } catch (error) {
  //       logger(error);
  //     } finally {
  //       setAccepting(false);
  //     }
  //   },
  // })
)(Bid);
