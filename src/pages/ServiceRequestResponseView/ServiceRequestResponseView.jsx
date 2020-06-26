import React, { Fragment } from "react";
import { Field, withFormik } from "formik";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

import Button from "components/Button";
import Select from "components/form/Select";
import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";
import Chat from "components/Chat";
import ServiceRequestStatus from "components/ServiceRequestStatus";
import MultiLangContent from "components/MultiLangContent";
import Icon, { ICON_NAMES } from "components/Icon";
import formatDate from "utils/formatDate";
import downloadZipWithFiles from "utils/downloadZipWithFiles";
import RequestActions from "components/RequestActions";
import AttachmentsSLider from "components/AttachmentsSLider";

const ServiceRequestResponseView = props => {
  const { intl, serviceResponse, commonData, userId } = props;

  const service = commonData.services.find(
    _service => _service.value === serviceResponse.data.request.serviceTypeId
  );

  const isUserCustomer = userId === serviceResponse.data.request.userId;

  return (
    <main className="main">
      <div className="container">
        <h1 className="section-title">
          {intl.formatMessage({
            id: "ui.navigation.service_request_details"
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
                    {serviceResponse.data.request.description}
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
                          {serviceResponse.data.request.priceMin}
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
                          {serviceResponse.data.request.priceMax}
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
                          {formatDate(
                            serviceResponse.data.request.preferredDate
                          )}
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
                          {serviceResponse.data.request.preferredTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="state-wrap">
                  <ServiceRequestStatus id={serviceResponse.data.status} />
                </div>

                {isUserCustomer && (
                  <RequestActions response={serviceResponse.data} />
                )}
              </div>
            </div>
          </div>
        </div>

        <AttachmentsSLider images={serviceResponse.data.attachments} />

        {/* {isUserCustomer && ( */}
        {true && (
          <Fragment>
            <div className="data__head">
              <h2 className="section-subtitle section-subtitle--blue">
                {intl.formatMessage({
                  id: "ui.navigation.service_provider_details"
                })}
              </h2>
              {serviceResponse.data.attachments.length > 0 && (
                <button
                  type="button"
                  className="link link--download link--color-site"
                  onClick={() =>
                    downloadZipWithFiles(serviceResponse.data.attachments)
                  }
                >
                  <span className="link__icon">
                    <Icon name={ICON_NAMES.downloadStrict} />
                  </span>
                  <span className="link__title">
                    {intl.formatMessage({
                      id: "ui.actions.download_samples"
                    })}
                  </span>
                </button>
              )}
            </div>
            <Link
              to={`${ROUTES.serviceProvider}/${serviceResponse.data.serviceProvider.id}`}
              className="section-bordered "
            >
              <span className="section-indent request-details-description">
                <span className="request-details__icon-wrap">
                  <img src="/img/temp/providers-logo.png" alt="" />
                </span>
                <span className="data-item">
                  <span className="data-item__label">
                    <MultiLangContent
                      text={serviceResponse.data.serviceProvider.businessName}
                    />
                  </span>
                  <span className="data-item__text">
                    <MultiLangContent
                      text={serviceResponse.data.serviceProvider.businessIntro}
                    />
                  </span>
                </span>
              </span>
            </Link>

            <div className="data">
              <div className="data__head">
                <h2 className="section-subtitle section-subtitle--blue">
                  {intl.formatMessage({
                    id: "ui.navigation.response"
                  })}
                </h2>
              </div>
              <div className="section-bordered  section-bordered--margin">
                <div className="section-indent">
                  <div className="request-details-description">
                    <div className="request-details__icon-wrap">
                      <img src="/img/temp/providers-logo.png" alt="" />
                    </div>
                    <div className="data-item__label">{service.label}</div>
                  </div>
                  <div className="information-row">
                    <div className="data-item">
                      <div className="data-item__label">
                        {intl.formatMessage({
                          id: "ui.fields.description"
                        })}
                        :
                      </div>
                      <div className="data-item__text">
                        {serviceResponse.data.description}
                      </div>
                    </div>
                  </div>
                  <div className="row information-row">
                    {/* <div className="col-6 col-md-4 data-item">
                      <div className="data-item__label">
                        {intl.formatMessage({
                          id: "ui.fields.budget_min"
                        })}
                        :
                      </div>
                      <div className="data-item__text">
                        {serviceResponse.data.priceMin}
                      </div>
                    </div> */}
                    <div className="col-6 col-md-4 data-item">
                      <div className="data-item__label">
                        {intl.formatMessage({
                          id: "ui.fields.price"
                        })}
                        :
                      </div>
                      <div className="data-item__text">
                        {serviceResponse.data.priceMax}
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.delivery_time"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {formatDate(serviceResponse.data.deliveryDate)}
                        </div>
                      </div>

                      <div className="data-item">
                        <div className="data-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.offer_expired"
                          })}
                          :
                        </div>
                        <div className="data-item__text">
                          {formatDate(serviceResponse.data.offerExpired)}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      {serviceResponse.data.warranty && (
                        <div className="data-item">
                          <div className="data-item__label">
                            {intl.formatMessage({
                              id: "ui.fields.warranty"
                            })}
                            :
                          </div>
                          <div className="data-item__text">
                            {serviceResponse.data.warranty}
                          </div>
                        </div>
                      )}
                      {serviceResponse.data.discount && (
                        <div className="data-item">
                          <div className="data-item__label">
                            {intl.formatMessage({
                              id: "ui.fields.discounted_price"
                            })}
                            :
                          </div>
                          <div className="data-item__text">
                            {serviceResponse.data.discount}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}

        <Chat data={serviceResponse.data} />
      </div>
    </main>
  );
};

export default ServiceRequestResponseView;
