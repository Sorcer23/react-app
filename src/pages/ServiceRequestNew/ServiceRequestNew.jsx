import React from "react";

import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";
import { compose } from "recompose";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";
import FileUpload from "components/form/FileUpload";
import Button from "components/Button";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import Select from "components/form/Select";
import DateInput from "components/form/DateInput";
import TimeInput from "components/form/TimeInput";
import ModalAction from "components/modals/ModalAction";
import "rc-slider/assets/index.css";
import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";

const ServiceRequestNew = props => {
  const {
    intl,
    service = {},
    values,
    modals,
    closeModal,
    serviceProviders,
    handleSubmit
  } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({
                id: "ui.navigation.service_request_details"
              })}
            </h1>
          </div>
          <form className="data__body" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <div className="request-details-card">
                  <div className="request-details-card__image-wrap">
                    <img
                      className="request-details-card__image"
                      src={getServerFileUrl(service.image, {
                        width: 360,
                        method: "resize"
                      })}
                      alt=""
                    />
                  </div>
                  <div className="request-details-card__description">
                    <div className="request-details-card__title">
                      {service.label}
                    </div>
                    {service.description && (
                      <div className="request-details-card__text">
                        {service.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="col-12 request-details__info">
                  <div className="row request-details__row">
                    <div className="col-md-6">
                      <div className="row request-details__row">
                        <div className="col-auto">
                          <label className="radio-btn radio-btn--without-label">
                            <input
                              type="radio"
                              name="address"
                              checked={values.serviceProviderId == null}
                              onChange={() =>
                                props.setFieldValue("serviceProviderId", null)
                              }
                            />
                            <span className="radio-btn__icon"></span>
                          </label>
                        </div>
                        <div className="col">
                          <h3 className="section-subtitle">
                            {intl.formatMessage({
                              id: "ui.requests.all_providers"
                            })}
                          </h3>
                        </div>
                      </div>
                      <div className="row request-details__row">
                        <div className="col-auto">
                          <label className="radio-btn radio-btn--without-label">
                            <input
                              type="radio"
                              name="address"
                              checked={values.serviceProviderId != null}
                              onChange={() => {}}
                            />
                            <span className="radio-btn__icon"></span>
                          </label>
                        </div>
                        <div className="col">
                          <Field
                            name="serviceProviderId"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.service_provider"
                            })}
                            component={Select}
                            options={serviceProviders.map(provider => ({
                              value: provider.id,
                              label: provider.businessName
                            }))}
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            name="preferredDate"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.preferred_date"
                            })}
                            component={DateInput}
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            name="preferredTime"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.preferred_time"
                            })}
                            component={TimeInput}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="section-subtitle">
                        {intl.formatMessage({ id: "ui.fields.budget" })}
                      </h3>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            name="priceMin"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.min_price"
                            })}
                            type="tel"
                            maxLength="12"
                            component={Input}
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            name="priceMax"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.max_price"
                            })}
                            type="tel"
                            maxLength="12"
                            component={Input}
                          />
                        </div>
                      </div>
                      <Field
                        name="description"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.description"
                        })}`}
                        component={Textarea}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h3 className="section-subtitle">
                        {intl.formatMessage({
                          id: "ui.actions.upload_capture_pictures"
                        })}
                      </h3>
                    </div>
                    <Field
                      name="attachments"
                      entity="requestAttachments"
                      placeholder={intl.formatMessage({
                        id: "ui.fields.add_photo"
                      })}
                      component={FileUpload}
                      colMd={6}
                    />
                    {/* <div className="col-md-6">
                      <Field
                        name="companyPic"
                        placeholder={intl.formatMessage({
                          id: 'ui.fields.add_photo',
                        })}
                        component={FileUpload}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="row rtl-reverse">
                  <div className="col-md-auto">
                    <Button type="submit">
                      {intl.formatMessage({ id: "ui.actions.submit_details" })}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <ModalAction
        params={{
          type: "success",
          message: intl.formatMessage({
            id: "ui.notifications.success.service_request_sent"
          }),
          onAfterClose: () => closeModal("successEdit")
        }}
        isOpen={modals["successEdit"]}
      >
        <div className="row justify-content-center">
          <div className="col-auto">
            <Button to={ROUTES.serviceRequestList}>
              {intl.formatMessage({ id: "ui.actions.go_to_list" })}
            </Button>
          </div>
        </div>
      </ModalAction>
    </main>
  );
};

export default ServiceRequestNew;
