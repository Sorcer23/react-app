import React, { useState } from "react";
import classNames from "classnames";
import { Element as ScrollContainer, scroller } from "react-scroll";

import history from "services/history";
import fileDownloadByUrl from "utils/fileDownloadByUrl";
import normalizeExternalLink from "utils/normalizeExternalLink";
import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import AppDataText from "components/AppDataText";
import Button from "components/Button";
import Breadcrumbs from "components/Breadcrumbs";
import MultiLangContent from "components/MultiLangContent";
import LinesEllipsis from "components/LinesEllipsis";
import SocialLink from "./SocialLink";
import ProviderAddresses from "./ProviderAddresses";
import ProviderEntities from "./ProviderEntities";
import Rating from "components/Rating";
import Reviews from "./Reviews";

const ServiceProvider = props => {
  const { intl, isMobile } = props;
  const { data } = props.serviceProvider;

  const [isDescriptionOpen, showDescription] = useState(false);

  return (
    <main className="main">
      <div className="container">
        {/* <Breadcrumbs currentTitle={data.businessName} /> */}
        <section className="data">
          <div className=" data__inner">
            <form action="">
              <div className="data__head">
                <h1 className="section-title">
                  {intl.formatMessage({
                    id: "ui.navigation.service_provider_profile"
                  })}
                </h1>
                <button
                  type="button"
                  onClick={() =>
                    fileDownloadByUrl(data.companyPic, `${data.businessName}`)
                  }
                  className="link link--download link--color-site"
                >
                  <span className="link__icon">
                    <Icon name={ICON_NAMES.downloadStrict} />
                  </span>
                  <span className="link__title">
                    {intl.formatMessage({
                      id: "ui.actions.download_company_profile"
                    })}
                  </span>
                </button>
              </div>
              <div className="provider-head">
                <div
                  className="sp-detail-bg"
                  style={{
                    backgroundImage: `url(${getServerFileUrl(data.profilePic)})`
                  }}
                ></div>
                <div className="provider-head__inner">
                  <div className="provider-head__column">
                    {/*<div className="provider-head__icon-wrap">*/}
                    {/*  <img src="/img/temp/providers-logo.png" alt=""/>*/}
                    {/*</div>*/}
                    <h3 className="provider-head__title">
                      <MultiLangContent text={data.businessName} />
                    </h3>
                  </div>
                  <div className="provider-head__column">
                    <div className="links-list">
                      {/*        <a href="#" className="link link--light">*/}
                      {/* <span className="link__icon">*/}
                      {/*<Icon name={ICON_NAMES.planet}/>*/}
                      {/*  </span>*/}
                      {/*          <span className="link__title">www.fsops.com</span>*/}
                      {/*        </a>*/}
                      {/* <a href="#" className="link link--light">
                        <span className="link__icon">
                          <Icon name={ICON_NAMES.pin} />
                        </span>
                        <span className="link__title">Doha, Qatar</span>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="data__body">
                <div className="section">
                  <div className="section__body">
                    {/* <div className="provider__row">
                      <div className="provider__head">
                        <div className="provider__section-title">
                          {intl.formatMessage({
                            id: 'ui.providers.products'
                          })}
                        </div>
                      </div>
                    </div> */}
                    <div className="provider__row">
                      <div className="provider-item">
                        <div className="provider-item__label">
                          {intl.formatMessage({
                            id: "ui.fields.business_introduction"
                          })}
                        </div>
                        <div className="provider-item__text">
                          {isMobile && !isDescriptionOpen ? (
                            <LinesEllipsis
                              text={data.businessIntro}
                              maxLine="3"
                            />
                          ) : (
                            <MultiLangContent text={data.businessIntro} />
                          )}
                        </div>
                      </div>
                    </div>
                    {isMobile && !isDescriptionOpen && (
                      <button
                        className="show-more"
                        type="button"
                        onClick={() => showDescription(true)}
                      >
                        {intl.formatMessage({ id: "ui.actions.show_more" })}
                      </button>
                    )}
                    <div
                      className={classNames("provider__description-rows", {
                        "is-active": !isMobile || isDescriptionOpen
                      })}
                    >
                      <div className="provider__row">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="provider-item">
                              <div className="provider-item__label">
                                {intl.formatMessage({
                                  id: "ui.providers.profession"
                                })}
                              </div>
                              <div className="provider-item__text">
                                <AppDataText
                                  id="proffesionTypes"
                                  value={data.professionType}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="provider-item">
                              <div className="provider-item__label">
                                {intl.formatMessage({
                                  id: "ui.fields.category"
                                })}
                              </div>
                              <div className="provider-item__text">
                                <AppDataText
                                  id="categories"
                                  value={data.categoryId}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="provider-item">
                              <div className="provider-item__label">
                                {intl.formatMessage({
                                  id: "ui.fields.contact_number"
                                })}
                              </div>
                              <div className="provider-item__text">
                                {data.contactNumber}
                              </div>
                            </div>
                          </div>
                          {data.altNumber && (
                            <div className="col-md-3">
                              <div className="provider-item">
                                <div className="provider-item__label">
                                  {intl.formatMessage({
                                    id: "ui.fields.alternate_number"
                                  })}
                                </div>
                                <div className="provider-item__text">
                                  {data.altNumber}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="provider__row row justify-content-end align-items-center">
                        <div className="col-auto">
                          <Rating value={data.rating} />
                        </div>
                        <div className="col-auto">
                          <Button onClick={() => scroller.scrollTo("reviews")}>
                            {intl.formatMessage({ id: "ui.providers.reviews" })}
                          </Button>
                        </div>
                      </div>
                      <div className="provider__row">
                        <div className="provider-item">
                          <div className="provider-item__label">
                            {intl.formatMessage({
                              id: "ui.providers.services"
                            })}
                          </div>
                          <div className="tag-list">
                            {data.services &&
                              data.services.map(serviceId => (
                                <div key={serviceId} className="tag--bordered">
                                  <AppDataText
                                    id="services"
                                    value={serviceId}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="provider-connect">
                      <div className="provider-connect__title">
                        {intl.formatMessage({
                          id: "ui.providers.connect_us"
                        })}
                      </div>
                      <div className="row">
                        <div className="provider-connect__social">
                          <div className="social social--provider-connect">
                            <div className="social__list">
                              <ProviderAddresses locations={data.locations} />
                              <a
                                href={normalizeExternalLink(
                                  data.companyWebsite
                                )}
                                target="_blank"
                                className="social__link"
                              >
                                <Icon name={ICON_NAMES.planet} />
                              </a>
                              <a
                                href={`tel:${data.contactNumber}`}
                                className="social__link"
                              >
                                <Icon name={ICON_NAMES.phone} />
                              </a>
                              <a
                                href={`mailto:${data.businessEmail}`}
                                className="social__link"
                              >
                                <Icon name={ICON_NAMES.mail} />
                              </a>
                            </div>
                          </div>
                        </div>
                        {(data.fbLink ||
                          data.scLink ||
                          data.twLink ||
                          data.instLink) && (
                          <div className="provider-connect__social">
                            <div className="social">
                              <div className="social__list">
                                <SocialLink url={data.fbLink} name="facebook" />
                                <SocialLink url={data.scLink} name="snapchat" />
                                <SocialLink url={data.twLink} name="twitter" />
                                <SocialLink
                                  url={data.instLink}
                                  name="instagram"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <ProviderEntities
                      title={intl.formatMessage({
                        id: "ui.providers.products"
                      })}
                      titleIsEmpty={intl.formatMessage({
                        id: "ui.providers.no_products"
                      })}
                      entities={props.products}
                      entityName="product"
                    />
                    <ProviderEntities
                      title={intl.formatMessage({
                        id: "ui.providers.services"
                      })}
                      titleIsEmpty={intl.formatMessage({
                        id: "ui.providers.no_services"
                      })}
                      entities={props.services}
                      entityName="service"
                    />
                    <ProviderEntities
                      title={intl.formatMessage({
                        id: "ui.navigation.post_list"
                      })}
                      titleIsEmpty={intl.formatMessage({
                        id: "ui.providers.no_posts"
                      })}
                      entities={props.posts}
                      entityName="post"
                    />
                    <ProviderEntities
                      title={intl.formatMessage({
                        id: "ui.providers.work_samples"
                      })}
                      titleIsEmpty={intl.formatMessage({
                        id: "ui.providers.no_work_samples"
                      })}
                      entities={data.workSamples}
                      entityName="sample"
                    />

                    {data.reviews.length > 0 && (
                      <ScrollContainer name="reviews" className="provider__row">
                        <div className="provider__head">
                          <div className="provider__section-title">
                            {intl.formatMessage({ id: "ui.providers.reviews" })}
                          </div>
                        </div>
                        <Reviews list={data.reviews} />
                      </ScrollContainer>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceProvider;
