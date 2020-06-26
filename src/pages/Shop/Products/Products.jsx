import React, { Fragment } from "react";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";

import ROUTES from "config/routes";
import ApiService from "services/api";
import history from "services/history";
import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import Search from "components/Search";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Filter from "./Filter";

const Products = props => {
  const {
    intl,
    products,
    hasMore,
    loadMore,
    changeFilter,
    resetFilter
  } = props;

  return (
    <Fragment>
      <div className="posts">
        <div className="container">
          <Search
            apiLoadResults={ApiService.getProductsSearchMatches}
            onSelectQuery={query => changeFilter("q", query)}
          />

          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage(
                { id: "ui.products.products_available" },
                { number: products.total }
              )}
            </h1>
          </div>
        </div>
      </div>
      <Categories />
      <SubCategories />
      <div className="container">
        {products.isFiltered && (
          <div className="section-header">
            <h3 className="section-title">
              {intl.formatMessage(
                { id: "ui.products.products_available" },
                { number: products.totalFiltered }
              )}
            </h3>
            <button type="button" onClick={resetFilter}>
              {intl.formatMessage({ id: "ui.actions.reset_filters" })}
            </button>
          </div>
        )}
        <InfiniteScroll
          className="posts__body"
          pageStart={0}
          hasMore={hasMore}
          loadMore={page => loadMore(page)}
          loader={<div key={0}>Loading...</div>}
        >
          <Masonry options={{}} className="post-list">
            {products.list.map(product => (
              <div key={product.id} className="post-preview">
                {/* <div className="post-preview__actions">
                      <div className="row justify-content-end">
                        <div className="col-auto">
                          <button className="button-favorite" type="button">
                            <Icon name={ICON_NAMES.favorite} />
                          </button>
                        </div>
                        <div className="col-auto">
                          <button className="button-post-menu" type="button">
                            <Icon name={ICON_NAMES.dots} />
                          </button>
                        </div>
                      </div>
                    </div> */}
                <img
                  tabIndex="0"
                  role="button"
                  className="post-preview__image"
                  src={getServerFileUrl(product.images[0], {
                    method: "resize",
                    width: 320
                  })}
                  alt=""
                  onClick={() =>
                    history.push(`${ROUTES.product}/${product.id}`)
                  }
                />
                <div className="post-preview__description">
                  <p>{product.title}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
        <Filter />
      </div>
    </Fragment>
  );
};

export default Products;
