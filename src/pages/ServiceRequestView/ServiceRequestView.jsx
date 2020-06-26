import React, { Fragment } from "react";
import { Field, withFormik } from "formik";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Select from "components/form/Select";
import Chat from "components/Chat";
import RequestActions from "components/RequestActions";
import ServiceRequestStatus from "components/ServiceRequestStatus";
import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";
import formatDate from "utils/formatDate";
import { config as serviceRequestConfig } from "modules/serviceRequest";
import formatDateTime from "utils/formatDateTime";
import AttachmentsSLider from "components/AttachmentsSLider";

const ServiceRequestView = props => {
  const { intl, serviceRequest, byProvider, commonData } = props;

  const service = commonData.services.find(
    _service => _service.value === serviceRequest.data.serviceTypeId
  );

  return (
    <main className="main">
      <div className="container">
        <h1 className="section-title">
          {intl.formatMessage({
            id: "ui.navigation.request_details"
          })}
        </h1>
        <div className="data__head">
          <h2 className="section-subtitle section-subtitle--blue">
            {intl.formatMessage({
              id: "ui.navigation.quote_details"
            })}
          </h2>
        </div>
        <div className="section-bordered section-bordered--margin">
          <div className="row">
            <div className="col-md-5">
              <div className="request-details-card request-details-card--straight">
                <div className="request-details-card__image-wrap">
                  <img
                    className="request-details-card__image"
                    src={getServerFileUrl(service.image, {
                      width: 456,
                      method: "resize"
                    })}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7 request-details-info">
              <div className="request-details-info__inner">
                <div className="request-details-info__head">
                  <h3 className="request-details__title">{service.label}</h3>
                </div>
                <div className="request-details-info__body">
                  <h4 className="request-details__subtitle">
                    {intl.formatMessage({
                      id: "ui.fields.query"
                    })}
                    :{" "}
                  </h4>
                  <div className="list list--dotted">
                    {serviceRequest.data.description}
                  </div>
                  <div className="row data-items-row">
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.budget_min"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {serviceRequest.data.priceMin}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.budget_max"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {serviceRequest.data.priceMax}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.preferred_date"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {formatDate(serviceRequest.data.preferredDate)}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.preferred_time"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {serviceRequest.data.preferredTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {byProvider ? (
                    <Fragment>
                      <div className="request-actions">
                        <Button
                          to={`${ROUTES.serviceRequestResponse}/${serviceRequest.data.id}`}
                        >
                          {intl.formatMessage({
                            id: "ui.actions.submit_response"
                          })}
                        </Button>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="state-wrap">
                        <ServiceRequestStatus id={serviceRequest.data.status} />
                      </div>

                      <RequestActions response={serviceRequest.data} />
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!byProvider &&
          serviceRequest.data.status === serviceRequestConfig.STATUSES.new && (
            <div className="row justify-content-end button-row">
              <div className="col-auto">
                <Button
                  to={`${ROUTES.serviceRequestEdit}/${serviceRequest.data.id}`}
                  className="btn--light"
                  type="button"
                >
                  {intl.formatMessage({ id: "ui.actions.edit" })}
                </Button>
              </div>
            </div>
          )}
        <AttachmentsSLider images={serviceRequest.data.attachments} />

        <Chat data={serviceRequest.data} />
      </div>
    </main>
  );
};

export default ServiceRequestView;
