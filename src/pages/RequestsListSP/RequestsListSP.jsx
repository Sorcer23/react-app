import React from "react";

import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";
import { compose } from "recompose";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Input from "components/form/Input";
import Select from "../../components/form/Select";

const RequestsListSP = props => {
  const { intl } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="row data__head justify-content-md-between ">
            <div className="col-auto">
              <h1 className="section-title">My Requests</h1>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <Field
                name="priceUnit"
                placeholder={intl.formatMessage({
                  id: "ui.fields.sort_by"
                })}
                options={[
                  { value: 0, label: "Data requested" },
                  { value: 1, label: "Bid low/high" }
                ]}
                component={Select}
              />
            </div>
            <div className="col-md-auto">
              <div className="row justify-content-between ">
                <div className="col-auto">
                  <div className="switch-field switch-field--lg">
                    <input
                      className="switch-field__input"
                      type="radio"
                      id="radio-1-3"
                      name="switch-three"
                      defaultValue="1"
                    />
                    <label className="switch-field__label" htmlFor="radio-1-3">
                      New
                    </label>
                    <input
                      className="switch-field__input"
                      type="radio"
                      id="radio-2-3"
                      name="switch-three"
                      defaultValue="2"
                    />
                    <label className="switch-field__label" htmlFor="radio-2-3">
                      Ongoing
                    </label>
                    <input
                      className="switch-field__input"
                      type="radio"
                      id="radio-3-3"
                      name="switch-three"
                      defaultValue="3"
                      defaultChecked
                    />
                    <label className="switch-field__label" htmlFor="radio-3-3">
                      History
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <button type="button" className="user-link">
                    <Icon name={ICON_NAMES.human} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="data__body">
            <div className="row">
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--new">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">New Request</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/comfort-contemporary.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--accepted">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Accepted</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--ongoing">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Ongoing</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--accepted">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Accepted</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/comfort-contemporary.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--accepted">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Accepted</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--ongoing">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Ongoing</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--accepted">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Accepted</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/comfort-contemporary.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--accepted">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Accepted</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 card-request-wrap">
                <div className="card-request">
                  <div className="card-request__image-wrap">
                    <img
                      className="card-request__image"
                      src="/img/temp/card-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-request-description">
                    <div className="card-request-description__head">
                      <div className="card-request__title">
                        Drawing Room Design
                      </div>
                      <div className="card-request__author">
                        by{" "}
                        <a className="card-request__author-link" href="#">
                          Home Centre
                        </a>
                      </div>
                    </div>
                    <div className="card-request-description__body">
                      <div className="card-request__tags">
                        <span className="card-request-tag">Sassy Candle</span>,
                        <span className="card-request-tag">
                          Table Top with Pot
                        </span>
                      </div>
                      <div className="card-request__text">
                        <b>Query</b>: Lorem ipsum dolor sit amet, consectetur
                        adipi scing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua labore et dolore magna
                      </div>
                      <div className="card-request__data-wrap">
                        Booking Date:{" "}
                        <span className="card-request__data">
                          26th Nov 2018
                        </span>
                      </div>
                    </div>
                    <div className="card-request-description__footer">
                      <div className="state state--ongoing">
                        <Icon
                          name={ICON_NAMES.document}
                          className="state__icon"
                        />
                        <div className="state__title">Ongoing</div>
                      </div>
                      <button className="btn btn--card btn--bordered btn--width-100">
                        Submit Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default compose(
  withFormik({
    name: "RequestsListSP"
  }),
  passAuthUser,
  pageLayout(),
  injectIntl
)(RequestsListSP);
