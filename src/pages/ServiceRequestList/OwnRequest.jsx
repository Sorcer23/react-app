import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import Icon, { ICON_NAMES } from "components/Icon";
import ServiceRequestStatus from "components/ServiceRequestStatus";
import Button from "components/Button";
import LinesEllipsis from "components/LinesEllipsis";
import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";
import { config as serviceRequestConfig } from "modules/serviceRequest";
import formatDate from "utils/formatDate";

function Request(props) {
  const { intl, request, service } = props;

  const requestDetailsPath = `${ROUTES.serviceRequestView}/${request.id}`;

  return (
    <div className="col-md-6 card-request-wrap">
      <div className="card-request">
        <Link to={requestDetailsPath} className="card-request__image-wrap">
          <img
            className="card-request__image"
            src={getServerFileUrl(service.image, {
              width: 160,
              height: 250
            })}
            alt=""
          />
        </Link>
        <div className="card-request-description">
          <Link
            className="card-request-description__head"
            to={requestDetailsPath}
          >
            <div className="card-request__title">{service.label}</div>
            {/* <div className="card-request__author">
              by{' '}
              <a className="card-request__author-link" href="#">
                Home Centre
              </a>
            </div> */}
          </Link>
          <Link
            to={requestDetailsPath}
            className="card-request-description__body"
          >
            {/* <div className="card-request__tags">
              <span className="card-request-tag">Sassy Candle</span>,
              <span className="card-request-tag">Table Top with Pot</span>
            </div> */}
            <LinesEllipsis
              className="card-request__text"
              maxLine={3}
              html={`<b>${intl.formatMessage({ id: "ui.fields.query" })}</b>: ${
                request.description
              }`}
            />
            <div className="card-request__text">
              <b>{intl.formatMessage({ id: "ui.fields.budget_range" })}</b>:{" "}
              {`QRS ${request.priceMin}-${request.priceMax}`}
            </div>
            <div className="card-request__text">
              <b>{intl.formatMessage({ id: "ui.fields.request_date" })}</b>:{" "}
              {formatDate(request.preferredDate)}
            </div>
          </Link>
          <div className="card-request-description__footer">
            <ServiceRequestStatus id={request.status} />
            {request.status === serviceRequestConfig.STATUSES.new && (
              <Button
                size="xs"
                to={`${ROUTES.serviceRequestBids}/${request.id}`}
              >
                {intl.formatMessage({ id: "ui.actions.view_bids" })}
              </Button>
            )}
            {request.status === serviceRequestConfig.STATUSES.accepted && (
              <Button
                size="xs"
                to={`${ROUTES.serviceResponseView}/${request.acceptedId}`}
              >
                {intl.formatMessage({ id: "ui.actions.details" })}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="col-md-6 card-request-wrap">
    //   <div className="card-request">
    //     <div className="card-request__image-wrap">
    //       <img
    //         className="card-request__image"
    //         src="/img/temp/comfort-contemporary.jpg"
    //         alt=""
    //       />
    //     </div>
    //     <div className="card-request-description">
    //       <div className="card-request-description__head">
    //         <div className="card-request__title">Drawing Room Design</div>
    //         <div className="card-request__author">
    //           by{' '}
    //           <a className="card-request__author-link" href="#">
    //             Home Centre
    //           </a>
    //         </div>
    //       </div>
    //       <div className="card-request-description__body">
    //         <div className="card-request__tags">
    //           <span className="card-request-tag">Sassy Candle</span>,
    //           <span className="card-request-tag">Table Top with Pot</span>
    //         </div>
    //         <div className="card-request__text">
    //           <b>Query</b>: Lorem ipsum dolor sit amet, consectetur adipi scing
    //           elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    //           aliqua labore et dolore magna
    //         </div>
    //         <div className="card-request__data-wrap">
    //           Booking Date:{' '}
    //           <span className="card-request__data">26th Nov 2018</span>
    //         </div>
    //       </div>
    //       <div className="card-request-description__footer">
    //         <div className="state state--accepted">
    //           <Icon name={ICON_NAMES.document} className="state__icon" />
    //           <div className="state__title">Accepted</div>
    //         </div>
    //         <div className="bid-status">
    //           <Icon name={ICON_NAMES.wallet} className="bid-status__icon" />
    //           <div className="bid-status__title">Accepted Bid:</div>
    //           <div className="bid-status__value">QRS 200</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="col-md-6 card-request-wrap">
    //   <div className="card-request">
    //     <div className="card-request__image-wrap">
    //       <img
    //         className="card-request__image"
    //         src="/img/temp/card-3.jpg"
    //         alt=""
    //       />
    //     </div>
    //     <div className="card-request-description">
    //       <div className="card-request-description__head">
    //         <div className="card-request__title">Drawing Room Design</div>
    //         <div className="card-request__author">
    //           by{' '}
    //           <a className="card-request__author-link" href="#">
    //             Home Centre
    //           </a>
    //         </div>
    //       </div>
    //       <div className="card-request-description__body">
    //         <div className="card-request__tags">
    //           <span className="card-request-tag">Sassy Candle</span>,
    //           <span className="card-request-tag">Table Top with Pot</span>
    //         </div>
    //         <div className="card-request__text">
    //           <b>Query</b>: Lorem ipsum dolor sit amet, consectetur adipi scing
    //           elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    //           aliqua labore et dolore magna
    //         </div>
    //         <div className="card-request__data-wrap">
    //           Booking Date:{' '}
    //           <span className="card-request__data">26th Nov 2018</span>
    //         </div>
    //       </div>
    //       <div className="card-request-description__footer">
    //         <div className="state state--ongoing">
    //           <Icon name={ICON_NAMES.document} className="state__icon" />
    //           <div className="state__title">Ongoing</div>
    //         </div>
    // <Button size="xs" type="submit">
    //   View Bids
    // </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default compose(
  connect((state, props) => {
    const serviceTypeId =
      props.request.request == null
        ? props.request.serviceTypeId
        : props.request.request.serviceTypeId;

    return {
      service: state.appData.list.services.find(
        service => service.value === serviceTypeId
      )
    };
  }),
  injectIntl
)(Request);
