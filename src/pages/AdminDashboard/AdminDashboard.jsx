import React from "react";

import { compose } from "recompose";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";

const AdminDashboard = () => {
  return (
    <main className="main">
      <section className="dashboard">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">Dashboard</h1>
          </div>
          <div className="data__body">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="dashboard-item dashboard-item--large">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">200k</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Lifetime Sales (in QRS)
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="dashboard-item dashboard-item--large">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">200k</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Month's total revenue
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="dashboard-item dashboard-item--large">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">200k</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Total Number of Services(any type of request) completed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">10</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      {" "}
                      Total Number of orders of day, week(current week) and
                      month (current month)
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">60</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Average Order count this month
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">20</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Top Search Terms (Post search)
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">20</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Total number of customers on the platform
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">10</span>
                  </div>
                  <div className="dashboard-item__info">
                    <h5 className="dashboard-item__title">
                      Total number of SPs
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">60</span>
                  </div>
                  <div className="dashboard-item__info">
                    <div className="switch-field">
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-1"
                        name="switch-one"
                        defaultValue="1"
                        defaultChecked
                      />
                      <label className="switch-field__label" htmlFor="radio-1">
                        Today
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-2"
                        name="switch-one"
                        defaultValue="2"
                      />
                      <label className="switch-field__label" htmlFor="radio-2">
                        Week
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-3"
                        name="switch-one"
                        defaultValue="3"
                      />
                      <label className="switch-field__label" htmlFor="radio-3">
                        Month
                      </label>
                    </div>
                    <h5 className="dashboard-item__title">
                      Maximum booked category
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">20</span>
                  </div>
                  <div className="dashboard-item__info">
                    <div className="switch-field">
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-1-2"
                        name="switch-two"
                        defaultValue="1"
                        defaultChecked
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-1-2"
                      >
                        Today
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-2-2"
                        name="switch-two"
                        defaultValue="2"
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-2-2"
                      >
                        Week
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-3-2"
                        name="switch-two"
                        defaultValue="3"
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-3-2"
                      >
                        Month
                      </label>
                    </div>
                    <h5 className="dashboard-item__title">
                      Maximum booked services
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="dashboard-item ">
                  <div
                    className="dashboard-item__image-wrap "
                    style={{ backgroundImage: "url('/img/icon_bg.svg')" }}
                  >
                    <span className="dashboard-item__value">20</span>
                  </div>
                  <div className="dashboard-item__info">
                    <div className="switch-field">
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-1-3"
                        name="switch-three"
                        defaultValue="1"
                        defaultChecked
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-1-3"
                      >
                        Today
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-2-3"
                        name="switch-three"
                        defaultValue="2"
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-2-3"
                      >
                        Week
                      </label>
                      <input
                        className="switch-field__input"
                        type="radio"
                        id="radio-3-3"
                        name="switch-three"
                        defaultValue="3"
                      />
                      <label
                        className="switch-field__label"
                        htmlFor="radio-3-3"
                      >
                        Month
                      </label>
                    </div>
                    <h5 className="dashboard-item__title">
                      Maximum booked service provider
                    </h5>
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

export default compose(passAuthUser, pageLayout())(AdminDashboard);
