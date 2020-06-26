import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import LinesEllipsis from "components/LinesEllipsis";
import Icon, { ICON_NAMES } from "components/Icon";
import ServiceRequestStatus from "components/ServiceRequestStatus";
import getServerFileUrl from "utils/getServerFileUrl";
import formatDate from "utils/formatDate";
import ROUTES from "config/routes";

function RequestLink({ isResponse, requestId, children, className }) {
  if (!isResponse)
    return (
      <Link to={`${ROUTES.serviceRequestViewByProvider}/${requestId}`}>
        {children}
      </Link>
    );

  return <div className={className}>{children}</div>;
}

function IncomingRequest(props) {
  const { intl, service, isResponse } = props;

  const response = isResponse && props.request;
  const request =
    props.request.request == null ? props.request : props.request.request;

  return (
    <div className="col-md-6 card-request-wrap">
      <div className="card-request">
        <RequestLink
          className="card-request__image-wrap"
          requestId={request.id}
          isResponse={isResponse}
        >
          <img
            className="card-request__image"
            src={getServerFileUrl(service.image, {
              width: 160,
              height: 250
            })}
            alt=""
          />
        </RequestLink>
        <div className="card-request-description">
          <RequestLink
            className="card-request-description__head"
            requestId={request.id}
            isResponse={isResponse}
          >
            <div className="card-request__title">{service.label}</div>
            {/* <div className="card-request__author">
              by{' '}
              <a className="card-request__author-link" href="#">
                Home Centre
              </a>
            </div> */}
          </RequestLink>
          <div className="card-request-description__body">
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
            {/* <div className="card-request__data-wrap">
              {}:{' '}
              <span className="card-request__data">26th Nov 2018</span>
            </div> */}
          </div>
          <div className="card-request-description__footer">
            <ServiceRequestStatus
              id={
                isResponse && request.status === 0 ? "ongoing" : request.status
              }
            />
            {isResponse ? (
              <Link
                to={`${ROUTES.serviceResponseView}/${response.id}`}
                className="btn btn--card btn--bordered btn--width-100"
              >
                {intl.formatMessage({ id: "ui.actions.details" })}
              </Link>
            ) : (
              <Link
                to={`${ROUTES.serviceRequestResponse}/${request.id}`}
                className="btn btn--card btn--bordered btn--width-100"
              >
                {intl.formatMessage({ id: "ui.actions.submit_response" })}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
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
)(IncomingRequest);
