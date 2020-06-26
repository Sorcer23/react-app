import React from "react";

import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";
import { compose } from "recompose";

import AppDataModule from "modules/appData";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import Select from "components/form/Select";
import DateInput from "components/form/DateInput";
import FileUpload from "components/form/FileUpload";
import { connect } from "react-redux";

const RequestDetails = props => {
  const { intl, commonData } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          {/* <div className="row justify-content-end">
            <div className="col-4 col-md-3 col-lg-2">
              <Button className="btn--width-100" type="submit">
                Checkout
              </Button>
            </div>
          </div> */}
          <h1 className="section-title">Request Details</h1>
          <div className="data__head">
            <h2 className="section-subtitle section-subtitle--blue">
              {intl.formatMessage({
                id: "ui.navigation.quote_details"
              })}
            </h2>
            {/* <button
              type="button"
              className="link link--download link--color-site"
            >
              <span className="link__icon">
                <Icon name={ICON_NAMES.chat} />
              </span>
              <span className="link__title">
                {intl.formatMessage({
                  id: "ui.actions.chat_with_provider"
                })}
              </span>
            </button> */}
          </div>
          <div className="section-bordered section-bordered--margin">
            <div className="row">
              <div className="col-md-5">
                <div className="request-details-card request-details-card--straight">
                  <div className="request-details-card__image-wrap">
                    <img
                      className="request-details-card__image"
                      src="/img/temp/request-details.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7 request-details-info">
                <div className="request-details-info__inner">
                  <div className="request-details-info__head">
                    <h3 className="request-details__title">
                      Luxury Appartment, fit for palm…
                    </h3>
                    <h5 className="request-details__author">
                      by{" "}
                      <a href="#" className="request-details__author-link">
                        Home Centre
                      </a>
                    </h5>
                  </div>
                  <div className="request-details-info__body">
                    <h4 className="request-details__subtitle">Query: </h4>
                    <ul className="list list--dotted">
                      <li className="list__item">
                        Lorem ipsum dolor sit amet, consectetur adipi scing
                        elit, sed do eiusmod tempor incididunt?
                      </li>
                      <li className="list__item">
                        Lorem ipsum dolor sit amet, consectetur adipi scing
                        elit?
                      </li>
                    </ul>
                    <div className="row data-items-row">
                      <div className="col-6 col-md-4 col-lg-3">
                        <div className="data-item">
                          <div className="data-item__label">Budget min:</div>
                          <div className="data-item__text">999.98</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-3">
                        <div className="data-item">
                          <div className="data-item__label">Budget max:</div>
                          <div className="data-item__text">999.98</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-3">
                        <div className="data-item">
                          <div className="data-item__label">
                            Preferred Date:
                          </div>
                          <div className="data-item__text">26th Nov 2018</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 col-lg-3">
                        <div className="data-item">
                          <div className="data-item__label">
                            Preferred Time:
                          </div>
                          <div className="data-item__text">18:22</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="state-wrap">
                    <div className="state state--accepted">
                      <Icon
                        name={ICON_NAMES.document}
                        className="state__icon"
                      />
                      <div className="state__title">Accepted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-end button-row">
            <div className="col-auto">
              <Button className="btn--light" type="button">
                Edit
              </Button>
            </div>
          </div>
          <div className="data">
            {/* ras part1*/}
            <div className="data__head">
              <h2 className="section-subtitle section-subtitle--blue">
                {intl.formatMessage({
                  id: "ui.navigation.service_request_edit"
                })}
              </h2>
            </div>
            <div className="row">
              <div className="col">
                <div className="col-12 request-details__info">
                  <div className="row request-details__row">
                    <div className="col-md-4">
                      <div className="row request-details__row">
                        <div className="col-auto">
                          <label className="radio-btn radio-btn--without-label">
                            <input type="radio" name="address" />
                            <span className="radio-btn__icon"></span>
                          </label>
                        </div>
                        <div className="col">
                          <h3 className="section-subtitle">
                            All Service providers
                          </h3>
                        </div>
                      </div>
                      <div className="row request-details__row">
                        <div className="col-auto">
                          <label className="radio-btn radio-btn--without-label">
                            <input type="radio" name="address" />
                            <span className="radio-btn__icon"></span>
                          </label>
                        </div>
                        <div className="col">
                          <Field
                            name="filter"
                            placeholder="Service Provider"
                            component={Select}
                            options={[
                              { value: 0, label: "Option 1" },
                              { value: 1, label: "Option 2" }
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <h3 className="section-subtitle">
                        {intl.formatMessage({ id: "ui.fields.budget" })}
                      </h3>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            name="min_price"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.min_price"
                            })}
                            component={Input}
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            name="max_price"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.max_price"
                            })}
                            component={Input}
                          />
                        </div>
                      </div>
                      <h3 className="section-subtitle">Preferred date/time</h3>

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
                            component={DateInput}
                            pickerAttr={{
                              showTimeSelect: true,
                              dateFormat: "h:mm aa",
                              showTimeSelectOnly: true
                            }}
                          />
                        </div>
                      </div>
                      {/*<div className="field field-select field--range">*/}
                      {/*  <div className="field-label">{intl.formatMessage({ id: 'ui.fields.budget' })}</div>*/}
                      {/*  <div className="field__data">*/}
                      {/*    <Range />*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                      {/*<h3 className="section-subtitle">Description</h3>*/}
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="description.ar"
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
                    <div className="col-md-4">
                      <Field
                        name="companyPic"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.add_photo"
                        })}
                        component={FileUpload}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="companyPic"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.add_photo"
                        })}
                        component={FileUpload}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="companyPic"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.add_photo"
                        })}
                        component={FileUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <Button type="submit">
                      {intl.formatMessage({ id: "ui.actions.submit_details" })}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* ras part1*/}
            <div className="data__head">
              <h2 className="section-subtitle section-subtitle--blue">
                {intl.formatMessage({
                  id: "ui.navigation.service_provider_details"
                })}
              </h2>
              <button
                type="button"
                className="link link--download link--color-site"
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
            </div>
            <div className="section-bordered ">
              <div className="section-indent request-details-description">
                <div className="request-details__icon-wrap">
                  <img src="/img/temp/providers-logo.png" alt="" />
                </div>
                <div className="data-item">
                  <div className="data-item__label">Isha Shrivastava</div>
                  <div className="data-item__text">
                    Lorem ipsum dolor sit amet, consectetur adipi scing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua labore et dolore magna
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <div className="data-item__label">Home Centre</div>
                </div>
                <div className="information-row">
                  <div className="data-item">
                    <div className="data-item__label">Description:</div>
                    <div className="data-item__text">
                      Lorem ipsum dolor sit amet, consectetur adipi scing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua labore et dolore magna Lorem ipsum dolor sit amet,
                      consectetur adipi scing elit?
                    </div>
                  </div>
                </div>
                <div className="row information-row">
                  <div className="col-6 col-md-4 data-item">
                    <div className="data-item__label">Price unit:</div>
                    <div className="data-item__text">set</div>
                  </div>
                  <div className="col-6 col-md-4 data-item">
                    <div className="data-item__label">Bid:</div>
                    <div className="data-item__text">10 000 QAR</div>
                  </div>
                  <div className="col-6 col-md-4 data-item">
                    <div className="data-item__label">Valid Till:</div>
                    <div className="data-item__text">15th April</div>
                  </div>
                </div>
              </div>
              {/* <div className="request-details-points">
                <div className="info-points">
                  <Icon
                    name={ICON_NAMES.document}
                    className="info-points__icon"
                  />
                  <div className="info-points__title">Sinan Points</div>
                </div>
                <div className="request-details-points__value">50</div>
              </div> */}
            </div>
            <div className="row justify-content-end button-row">
              <div className="col-auto">
                <Button className="btn--light" type="button">
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <div className="data-section">
            <div className="data__head">
              <h2 className="section-subtitle section-subtitle--blue">
                {intl.formatMessage({
                  id: "ui.navigation.submit_response"
                })}
              </h2>
            </div>
            <div className="data__body">
              <div className="response-form  ">
                <div className="section-bordered  section-bordered--margin">
                  <div className="section-indent">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="col-12 response-form__form">
                          <div className="row">
                            <div className="col-md-6">
                              <Field
                                name="priceUnit"
                                placeholder={intl.formatMessage({
                                  id: "ui.fields.price_unit"
                                })}
                                options={commonData.priceUnit}
                                component={Select}
                              />
                              <Field
                                name="some2"
                                placeholder="Bid (QRS)"
                                component={Input}
                              />
                            </div>
                            <div className="col-md-6">
                              <Field
                                name="some"
                                placeholder={intl.formatMessage({
                                  id: "ui.fields.validity_date"
                                })}
                                component={Input}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <Field
                          name="description"
                          placeholder={intl.formatMessage({
                            id: "ui.fields.description"
                          })}
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
                      <div className="col-md-4">
                        <Field
                          name="companyPic"
                          placeholder={intl.formatMessage({
                            id: "ui.fields.add_photo"
                          })}
                          component={FileUpload}
                        />
                      </div>
                      <div className="col-md-4">
                        <Field
                          name="companyPic"
                          placeholder={intl.formatMessage({
                            id: "ui.fields.add_photo"
                          })}
                          component={FileUpload}
                        />
                      </div>
                      <div className="col-md-4">
                        <Field
                          name="companyPic"
                          placeholder={intl.formatMessage({
                            id: "ui.fields.add_photo"
                          })}
                          component={FileUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <Button type="submit" className="response-form__btn">
                      Submit Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="data">
            <div className="data__head">
              <h2 className="section-subtitle section-subtitle--blue">
                {intl.formatMessage({
                  id: "ui.navigation.chat_section"
                })}
              </h2>
              <div className="status-dropdown">
                <Field
                  name="status"
                  placeholder="Set status"
                  component={Select}
                  options={[
                    { value: 0, label: "status 1" },
                    { value: 1, label: "status 2" }
                  ]}
                />
              </div>
            </div>
            <div className="section-bordered ">
              <div className="section-indent">
                <div className="row">
                  <div className="col-6 col-md-4">
                    {/*Andrew, you know what to do =) http://joxi.ru/LmGGj96TJ94xKm .  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="chat">
            <div className="chat-header">
              <button className="button-back" type="button">
                <Icon name={ICON_NAMES.arrowLeft} />
              </button>
              <div className="chat-header__title">HomeCentre</div>
              <button className="button-refresh-chat" type="button">
                <Icon name={ICON_NAMES.refresh} />
              </button>
            </div>
            <div className="chat-info">
              <div className="chat-date-wrap">
                <div className="chat-date">April, 03 2019</div>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-message">
                <p className="chat-message__text"> Hi, how are you ? </p>
                <p className="chat-message__text">
                  Descriptioni Luxury Appartment, Lor em ipsum dolor sit amet..
                </p>
                <p className="chat-message__time"> 14h58</p>
              </div>
              <div className="chat-message chat-message--response">
                <p className="chat-message__text">
                  {" "}
                  Hey Megan ! It's been a while{" "}
                </p>
                <p className="chat-message__text"> When can we meet ?</p>
                <p className="chat-message__time"> 15h04</p>
              </div>

              <div className="chat-message">
                <p className="chat-message__text">
                  {" "}
                  9 pm at the bar if possible{" "}
                </p>
                <p className="chat-message__time"> 15h09</p>
              </div>
            </div>
            <div className="chat-footer">
              <form action="">
                <div className="chat-footer__inner">
                  <input
                    className="chat-input"
                    placeholder="Type your message"
                    type="text"
                  />
                  <button className="button-chat-send">
                    <Icon name={ICON_NAMES.messageSend} />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default compose(
  withFormik({
    name: "RequestDetails"
  }),
  passAuthUser,
  pageLayout(),
  injectIntl,
  connect(state => {
    return {
      commonData: AppDataModule.listSelector(state)("priceUnit")
    };
  })
)(RequestDetails);
