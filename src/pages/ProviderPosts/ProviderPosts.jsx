import React, { useEffect } from "react";
import { Field } from "formik";

import PagePagination from "components/PagePagination";
import Button from "components/Button";
import Input from "components/form/Input";
import Select from "components/form/Select";
import Filter from "./Filter";
import Post from "./Post";
import { Link } from "react-router-dom";
import ROUTES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";

function ProviderPosts(props) {
  const { intl, handlePaginationChange } = props;
  const posts = props.list.data;
  const pagination = props.list.pagination;
  const isLoading = props.list.isLoading;

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.post_list" })}
            </h1>
            <Link to={ROUTES.postAdd} className="link-page">
              {intl.formatMessage({ id: "ui.navigation.add_post" })}
              <Icon name={ICON_NAMES.add} className="link-page__icon" />
            </Link>
          </div>

          <div className="data__body">
            <div className="section">
              <div className="section__body">
                <Filter />

                {!isLoading && pagination.total === 0 && (
                  <div className="section-title section-empty-title">
                    {intl.formatMessage({
                      id: "ui.posts.no_added_posts"
                    })}
                  </div>
                )}

                {posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}

                <PagePagination
                  {...pagination}
                  onChange={handlePaginationChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProviderPosts;
