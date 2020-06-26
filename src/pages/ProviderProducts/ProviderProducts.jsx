import React, { Fragment } from "react";

import PagePagination from "components/PagePagination";
import Filter from "./Filter";
import Product from "./Product";
import Icon, { ICON_NAMES } from "components/Icon";
import { Link } from "react-router-dom";
import ROUTES from "config/routes";

function ProviderProducts(props) {
  const { intl, handlePaginationChange, handleItemDelete } = props;
  const products = props.list.data;
  const pagination = props.list.pagination;
  const isLoading = props.list.isLoading;

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.product_list" })}
            </h1>
            <Link to={ROUTES.productAdd} className="link-page">
              {intl.formatMessage({ id: "ui.navigation.add_product" })}
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
                      id: "ui.products.no_added_products"
                    })}
                  </div>
                )}

                {products.map(product => (
                  <Product
                    key={product.id}
                    product={product}
                    onDelete={handleItemDelete}
                  />
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

export default ProviderProducts;
