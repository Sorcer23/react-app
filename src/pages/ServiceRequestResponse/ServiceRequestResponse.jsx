import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";
import { compose } from "recompose";

import AppDataModule from "modules/appData";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";
import FileUpload from "components/form/FileUpload";
import DateInput from "components/form/DateInput";
import Button from "components/Button";
import Input from "components/form/Input";
import InputPrice from "components/form/InputPrice";
import Textarea from "components/form/Textarea";
import Select from "components/form/Select";
import ModalAction from "components/modals/ModalAction";
import ROUTES from "config/routes";

const ServiceRequestResponse = props => {
  const {
    intl,
    commonData,
    serviceRequest,
    modals,
    closeModal,
    handleSubmit
  } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.actions.submit_response" })}
            </h1>
          </div>
          <form className="data__body" onSubmit={handleSubmit}>
            <div className="response-form">
              <div className="response-form__inner">
                <div className="row">
                  <div className="col-md-4">
                    <div className="response-form__description">
                      <div className="response-form__text">
                        {serviceRequest.data.description}
                      </div>
                      <Field
                        name="description"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.description"
                        })}
                        component={Textarea}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="col-12 response-form__form">
                      <div className="row">
                        <div className="col-md-6">
                          {/* <Field
                            name="priceMin"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.min_price"
                            })}
                            type="tel"
                            maxLength="12"
                            component={Input}
                          /> */}
                          <Field
                            name="priceMax"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.price"
                            })}
                            component={InputPrice}
                          />
                          <Field
                            name="warranty"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.warranty"
                            })}
                            type="tel"
                            maxLength="12"
                            component={Input}
                          />
                          <Field
                            name="discount"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.discounted_price"
                            })}
                            type="tel"
                            maxLength="12"
                            component={Input}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="offerExpired"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.offer_expired"
                            })}
                            component={DateInput}
                          />
                          <Field
                            name="deliveryDate"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.delivery_date"
                            })}
                            component={DateInput}
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
                          entity="responseAttachments"
                          placeholder={intl.formatMessage({
                            id: "ui.fields.add_photo"
                          })}
                          component={FileUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                {/* <div className="col-auto">
                  <Button type="submit" className="response-form__btn">
                    {intl.formatMessage({
                      id: 'ui.actions.request_for_update',
                    })}
                  </Button>
                </div> */}
                <div className="col-auto">
                  <Button
                    type="submit"
                    className="response-form__btn"
                    showLoader={serviceRequest.isSending}
                  >
                    {intl.formatMessage({ id: "ui.actions.submit_details" })}
                  </Button>
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
            id: "ui.notifications.success.service_response_sent"
          }),
          onAfterClose: () => closeModal("successResponse")
        }}
        isOpen={modals["successResponse"]}
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

export default ServiceRequestResponse;
