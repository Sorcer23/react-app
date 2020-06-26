import React from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";

import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import LinesEllipsis from "components/LinesEllipsis";
import Breadcrumbs from "components/Breadcrumbs";
import MultiLangContent from "components/MultiLangContent";
import Slider from "./Slider";
import EntityPreview from "./EntityPreview";

const Post = props => {
  const { intl } = props;
  const post = props.post.data;

  const entities = [
    ...post.products.map(product => ({ ...product, entityType: "product" })),
    ...post.services.map(service => ({ ...service, entityType: "service" }))
  ];

  return (
    <div className="wrapper">
      <main className="main">
        <section className="product">
          <div className="container">
            <Breadcrumbs
              currentTitle={<MultiLangContent text={post.title} />}
            />
            <div className="product__top">
              <h1 className="product__title">
                <MultiLangContent text={post.title} />
              </h1>
              <div className="row">
                <div className="col-lg-7">
                  <Slider images={post.images} />
                </div>
                <div className="col-lg-5">
                  <div className="product-info">
                    <div className="product-info__body">
                      {/* <div className="action-bar">
                        <button className="action-button" type="button">
                          <Icon className="action-button__icon" active name={ICON_NAMES.favorite} />
                          <span className="action-button__title">+3k Likes</span>
                        </button>
                        <button className="action-button" type="button">
                          <Icon className="action-button__icon" name={ICON_NAMES.mark} />
                          <span className="action-button__title">Save</span>
                        </button>
                        <button className="action-button" type="button">
                          <Icon className="action-button__icon" name={ICON_NAMES.share} />
                          <span className="action-button__title">Share</span>
                        </button>
                      </div> */}

                      {post.description && (
                        <LinesEllipsis
                          className="text"
                          maxLine={5}
                          text={post.description}
                        />
                      )}
                      <div className="product-list">
                        <div className="product-list__head">
                          <div className="product-list__title">
                            {intl.formatMessage({
                              id: "ui.posts.product_and_services"
                            })}
                          </div>
                        </div>
                        <div className="product-list__body">
                          {entities.map(entity => (
                            <EntityPreview key={entity.id} entity={entity} />
                          ))}
                        </div>
                        {/* <div className="product-list__bottom">
                          <button type="button" className="btn--width-100 btn">
                            {intl.formatMessage(
                              { id: 'ui.posts.want_all' },
                              { name: post.serviceProvider.businessName }
                            )}
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {post.fullDescription != null && (
              <div className="product__description">
                <div className="product__title">
                  {intl.formatMessage({ id: "ui.posts.desciption_about_post" })}
                </div>
                <p className="text">
                  <MultiLangContent text={post.fullDescription} />
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Post;
