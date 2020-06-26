import React from "react";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";

import ROUTES from "config/routes";
import history from "services/history";
import ApiService from "services/api/ApiService";
import getServerFileUrl from "utils/getServerFileUrl";
import Search from "components/Search";
import SpaceTypes from "./SpaceTypes";
import Filter from "./Filter";

const Home = props => {
  const { intl, posts, hasMore, loadMore, changeFilter, resetFilter } = props;

  return (
    <div className="page-body">
      <div className="posts">
        <div className="container">
          <Search
            apiLoadResults={ApiService.getPostsSearchMatches}
            onSelectQuery={query => changeFilter("q", query)}
          />
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage(
                { id: "ui.posts.posts_available" },
                { number: posts.total }
              )}
            </h1>
          </div>
        </div>
      </div>
      <SpaceTypes />
      <div className="container">
        {posts.isFiltered && (
          <div className="section-header">
            <h3 className="section-title">
              {intl.formatMessage(
                { id: "ui.posts.posts_available" },
                { number: posts.totalFiltered }
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
            {posts.list.map(post => (
              <div key={post.id} className="post-preview">
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
                  src={getServerFileUrl(post.images[0], {
                    method: "resize",
                    width: 320
                  })}
                  alt=""
                  onClick={() => history.push(`${ROUTES.post}/${post.id}`)}
                />
                <div className="post-preview__description">
                  <p>{post.title}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
        <Filter />
      </div>
    </div>
  );
};

export default Home;
