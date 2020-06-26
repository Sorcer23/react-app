import React, { Fragment } from "react";

import getServerFileUrl from "utils/getServerFileUrl";
import ROUTES from "config/routes";
import MultiLangContent from "components/MultiLangContent";
import AppDataText from "components/AppDataText";
import Button from "components/Button";
import Breadcrumbs from "components/Breadcrumbs";
import EntityProperty from "components/EntityProperty";
import Slider from "./Slider";

const PublicProduct = props => {
  const { intl } = props;

  const service = props.service.data;

  return (
    <div className="wrapper">
      <main className="main">
        <section className="single-product">
          <div className="container">
            <Breadcrumbs
              currentTitle={<MultiLangContent text={service.title} />}
            />
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-md-6">
                    <div className="single-product__title">
                      <MultiLangContent text={service.title} />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center justify-content-md-end">
                    <div className="single-product__author">
                      By:{" "}
                      <MultiLangContent
                        text={service.serviceProvider.businessName}
                      />
                    </div>
                  </div>
                </div>

                <Slider images={service.images} />

                {/* <div className="single-product__image-wrap">
                  {service.offerPrice != null && (
                    <div className="pricing-title">Discount</div>
                  )}
                  <img src={getServerFileUrl(service.images[0])} alt="" />
                </div> */}
                {/* <div className="action-bar">
                  <button className="action-button" type="button">
                    <Icon className="action-button__icon" active name={ICON_NAMES.favorite} />
                    <button type="button" className="action-button__title">+3k Likes</button>
                  </button>
                  <button className="action-button" type="button">
                    <Icon className="action-button__icon" name={ICON_NAMES.star} />
                    <button type="button" className="action-button__title">Favorites</button>
                  </button>
                  <button className="action-button" type="button">
                    <Icon className="action-button__icon" name={ICON_NAMES.share} />
                    <button type="button" className="action-button__title">Share</button>
                  </button>
                  <button className="action-button" type="button">
                    <Icon className="action-button__icon" name={ICON_NAMES.share} />
                    <button type="button" className="action-button__title">Views</button>
                  </button>
                  <button className="action-button" type="button">
                    <Icon className="action-button__icon" name={ICON_NAMES.share} />
                    <button type="button" className="action-button__title">Purchase</button>
                  </button>
                </div> */}

                <div className="single-product__request row">
                  <div className="col-12 col-sm-6">
                    <Button
                      to={`${ROUTES.serviceRequestNew}/${service.serviceTypeId}/${service.id}`}
                      width={100}
                    >
                      {intl.formatMessage({ id: "ui.actions.request" })}{" "}
                      <span className="arrow-right"></span>
                    </Button>
                  </div>
                </div>

                <div className="single-product__prices">
                  <div className="row">
                    <div className="col-md-6">
                      {!service.price ? (
                        <span className="title-price">Price: Inquire</span>
                      ) : (
                        <Fragment>
                          <div className="title-price">
                            {intl.formatMessage({ id: "ui.fields.price" })}{" "}
                            <span className="title-price__value">
                              {service.price}
                            </span>{" "}
                            QRS/
                            <AppDataText
                              id="priceUnit"
                              value={service.priceUnit}
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <div className="single-product-description">
                  <div className="single-product-description__body">
                    <div className="single-product__text">
                      <MultiLangContent text={service.description} />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <table className="table product-specification">
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <EntityProperty
                              title="ui.fields.category"
                              value={service.serviceCategoryId}
                              appData="categories"
                            />
                            <EntityProperty
                              title="ui.fields.service_type"
                              value={service.serviceTypeId}
                              appData="services"
                            />
                            <EntityProperty
                              title="ui.fields.colors"
                              value={service.colors}
                              appData="colors"
                            />
                          </tbody>
                        </table>
                      </div>
                      {/* <div className="col-md-6">
                        <table className="table product-specification">
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            
                          </tbody>
                        </table>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="single-product__sidebar">
                  {/* <div className="reviews">
                    <div className="reviews__title">People also buy</div>
                    <div className="row">
                      <div className="col-sm-6 col-lg-12">
                        <a href="#" className="review">
                          <span className="review__image-wrap">
                            <img src="/img/temp/sofa-2.jpg" alt="" />
                          </span>
                        </a>
                      </div>
                      <div className="col-sm-6 col-lg-12">
                        <a href="#" className="review">
                          <span className="review__image-wrap">
                            <img src="/img/temp/sofa-3.jpg" alt="" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <div className="reviews">
                    <div className="reviews__title">You might also Like:</div>
                    <div className="row">
                      <div className="col-sm-6 col-lg-12">
                        <a href="#" className="review">
                          <span className="review__image-wrap">
                            <img src="/img/temp/chair.jpg" alt="" />
                          </span>
                        </a>
                      </div>
                      <div className="col-sm-6 col-lg-12">
                        <a href="#" className="review">
                          <span className="review__image-wrap">
                            <img src="/img/temp/dresser.jpg" alt="" />
                          </span>
                        </a>
                      </div>
                      <div className="col-sm-6 col-lg-12">
                        <a href="#" className="review">
                          <span className="review__image-wrap">
                            <img src="/img/temp/lamp.jpg" alt="" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicProduct;
