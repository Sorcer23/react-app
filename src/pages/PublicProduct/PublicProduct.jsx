import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

import ROUTES from "config/routes";
import getServerFileUrl from "utils/getServerFileUrl";
import MultiLangContent from "components/MultiLangContent";
import AppDataText from "components/AppDataText";
import Breadcrumbs from "components/Breadcrumbs";
import EntityProperty from "components/EntityProperty";
import Slider from "./Slider";

const PublicProduct = props => {
  const { intl } = props;

  const product = props.product.data;

  return (
    <div className="wrapper">
      <main className="main">
        <section className="single-product">
          <div className="container">
            <Breadcrumbs
              currentTitle={<MultiLangContent text={product.title} />}
            />
            <div className="row">
              <div className="col-lg-9">
                <div className="single-product__top-row row">
                  <div className="col-md-6">
                    <div className="single-product__title">
                      <MultiLangContent text={product.title} />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex  align-items-center justify-content-md-end">
                    <div className="single-product__author">
                      By:{" "}
                      <MultiLangContent
                        text={product.serviceProvider.businessName}
                      />
                    </div>
                  </div>
                </div>
                <Slider images={product.images} />
                {/*<div className="single-product__image-wrap">*/}
                {/*  {product.offerPrice != null && (*/}
                {/*    <div className="pricing-title">Discount</div>*/}
                {/*  )}*/}
                {/*  <img src={getServerFileUrl(product.images[0])} alt="" />*/}
                {/*</div>*/}
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
                <div className="single-product__prices">
                  <div className="row single-product__prices-row">
                    <div className="col-md-6">
                      {product.wasPrice == null ? (
                        <Fragment>
                          <div className="title-price">
                            <span className="title-price__value">
                              {product.price}
                            </span>{" "}
                            QRS/
                            <AppDataText
                              id="priceUnit"
                              value={product.priceUnit}
                            />
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div className="title-price title-price--old">
                            {intl.formatMessage({ id: "ui.common.was" })}{" "}
                            <span className="title-price__value text-line-through">
                              {product.wasPrice}
                            </span>{" "}
                            QRS/
                            <AppDataText
                              id="priceUnit"
                              value={product.priceUnit}
                            />
                          </div>
                          <div className="title-price title-price--old">
                            <span className="title-price__value">
                              {product.price}
                            </span>{" "}
                            QRS/
                            <AppDataText
                              id="priceUnit"
                              value={product.priceUnit}
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>
                    {product.offerPrice && (
                      <div className="col-md-6">
                        <div className="title-price title-price--now">
                          <span>
                            {intl.formatMessage({
                              id: "ui.products.buy_now_for"
                            })}{" "}
                          </span>
                          <span className="title-price__value">
                            {product.offerPrice}
                          </span>{" "}
                          QRS/
                          <AppDataText
                            id="priceUnit"
                            value={product.priceUnit}
                          />
                        </div>
                        {product.offerToDate && (
                          <Countdown
                            date={product.offerToDate}
                            renderer={({
                              days,
                              hours,
                              minutes,
                              seconds,
                              completed
                            }) => {
                              if (completed)
                                return (
                                  <div className="title-price-sale">Ended</div>
                                );

                              return (
                                <div className="title-price-sale">
                                  {intl.formatMessage({
                                    id: "ui.products.sales_end_on"
                                  })}
                                  :{" "}
                                  <span className="title-price-sale__timer">
                                    {days > 0 ? `${days} days ` : ""}
                                    {hours > 0 ? `${hours}h:` : ""}
                                    {minutes > 0 ? `${minutes}m:` : ""}
                                    {`${seconds}s`}
                                  </span>
                                </div>
                              );
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="single-product-description">
                  <div className="single-product-description__body">
                    <div className="single-product__text">
                      <MultiLangContent text={product.description} />
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
                              title="ui.fields.brand"
                              value={product.brand}
                            />
                            <EntityProperty
                              title="ui.fields.made_in"
                              value={product.madeIn}
                            />
                            <EntityProperty
                              title="ui.fields.material"
                              value={product.material}
                            />
                            <EntityProperty
                              title="ui.fields.colors"
                              value={product.colors}
                              appData="colors"
                            />
                            <EntityProperty
                              title="ui.fields.category"
                              value={product.categoryId}
                              appData="productCategories"
                            />
                            <EntityProperty
                              title="ui.fields.sub_category"
                              value={product.subCategoryId}
                              appData="productSubCategories"
                            />
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <table className="table product-specification">
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <EntityProperty
                              title="ui.fields.availability"
                              value={
                                product.availability
                                  ? product.availability
                                  : intl.formatMessage({
                                      id: 'ui.products.out_of_stock',
                                    })
                              }
                            /> */}
                            <EntityProperty
                              title="ui.fields.delivery_options"
                              appData="deliveryOptions"
                              value={product.deliveryOption}
                            />
                            <EntityProperty
                              title="ui.fields.delivery"
                              value={product.delivery}
                            />
                            {product.delivery && (
                              <Fragment>
                                <EntityProperty
                                  title="ui.fields.delivery_days"
                                  value={product.deliveryDays}
                                />
                                <EntityProperty
                                  title="ui.fields.delivery_price"
                                  value={product.deliveryPrice}
                                />
                              </Fragment>
                            )}
                            <EntityProperty
                              title="ui.fields.dimensions"
                              value={product.dimensions}
                            />
                            <EntityProperty
                              title="ui.fields.recommended_size"
                              value={product.recommendedSize}
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {product.delivery && (
                      <div className="single-product__delivery-desc">
                        <span className="product-specification__title">
                          {intl.formatMessage({
                            id: "ui.fields.delivery_description"
                          })}
                        </span>
                        {`: `}
                        {/* <b>
                          {intl.formatMessage({
                            id: 'ui.fields.delivery_description',
                          })}
                        </b>
                        {`: `} */}
                        <MultiLangContent text={product.deliveryDescription} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="single-product__sidebar">
                  {product.products.length > 0 && (
                    <div className="reviews">
                      <div className="reviews__title">
                        {intl.formatMessage({ id: "ui.products.also_buy" })}
                      </div>
                      <div className="row">
                        {product.products.map(relatedProduct => (
                          <div
                            key={relatedProduct.id}
                            className="col-sm-6 col-lg-12"
                          >
                            <Link
                              to={`${ROUTES.product}/${relatedProduct.id}`}
                              className="review"
                            >
                              <span className="review__image-wrap">
                                <img
                                  src={getServerFileUrl(
                                    relatedProduct.images[0],
                                    {
                                      width: 240,
                                      height: 120
                                    }
                                  )}
                                  alt=""
                                />
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="reviews">
                    <div className="reviews__title">
                      {intl.formatMessage({ id: "ui.products.also_like" })}
                    </div>
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
