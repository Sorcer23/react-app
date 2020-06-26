import React, { Fragment } from "react";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";

import ROUTES from "config/routes";
import history from "services/history";
import ApiService from "services/api/ApiService";
import getServerFileUrl from "utils/getServerFileUrl";
import Search from "components/Search";
import Categories from "./Categories";
import SubCategories from "./SubCategories";

const Services = props => {
  const {
    intl,
    services,
    hasMore,
    loadMore,
    changeFilter,
    resetFilter
  } = props;

  return (
    <Fragment>
      <div className="container">
        <Search
          apiLoadResults={ApiService.getServicesSearchMatches}
          onSelectQuery={query => changeFilter("q", query)}
        />
      </div>
      <div className="posts">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage(
                { id: "ui.services.services_available" },
                { number: services.total }
              )}
            </h1>
          </div>
        </div>
      </div>

      <Categories />
      <SubCategories />
      <div className="container">
        {services.isFiltered && (
          <div className="section-header">
            <h3 className="section-title">
              {intl.formatMessage(
                { id: "ui.services.services_available" },
                { number: services.totalFiltered }
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
            {services.list.map(service => (
              <div key={service.id} className="post-preview">
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
                  src={getServerFileUrl(service.images[0], {
                    method: "resize",
                    width: 320
                  })}
                  alt=""
                  onClick={() =>
                    history.push(`${ROUTES.service}/${service.id}`)
                  }
                />
                <div className="post-preview__description">
                  <p>{service.title}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    </Fragment>
  );
};

export default Services;
