import React from "react";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";

import ROUTES from "config/routes";
import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import AppDataText from "components/AppDataText";
import ActionsMenu, { Action } from "components/ActionsMenu";
import MultiLangContent from "components/MultiLangContent";

function Product(props) {
  const { intl, product, handleDelete } = props;

  return (
    <div className="row data-row">
      <div className="col-auto id-column">{product.id}</div>
      <div className="col  visible-mobile">
        <div className="data-title data-title--mobile">
          <MultiLangContent text={product.title} />
        </div>
      </div>
      <div className="data-column data-column--large col-12 col-md">
        <div className="row">
          <div className="col-sm-2 col-md-auto">
            {product.images.length > 0 && (
              <div className="data-image">
                <img src={getServerFileUrl(product.images[0])} alt="" />
              </div>
            )}
          </div>
          <div className="data-column col-6 col-sm-2">
            <div className="data-title">
              <MultiLangContent text={product.title} />
            </div>
            <div className="data-subtitle">
              <AppDataText id="productCategories" value={product.categoryId} />
            </div>
            <div className="data-subtitle">
              {intl.formatMessage({ id: "ui.fields.price" })}: {product.price}
            </div>
          </div>
          <div className="data-column col-6 col-sm-2">
            <div className="data-subtitle">
              <AppDataText
                id="productSubCategories"
                value={product.subCategoryId}
              />
            </div>
            {product.wasPrice != null && (
              <div className="data-subtitle">
                {intl.formatMessage({ id: "ui.fields.old_price" })}:{" "}
                {product.wasPrice}
              </div>
            )}
          </div>
          <div className="data-column col-6 col-sm-2">
            {/* <div className="data-subtitle">Quantity</div> */}
            {product.offerPrice != null && (
              <div className="data-subtitle">
                {intl.formatMessage({ id: "ui.fields.offer_price" })}:{" "}
                {product.offerPrice}
              </div>
            )}
          </div>
          <div className="data-column col-6 col-sm-3">
            <div className="data-subtitle">
              <AppDataText
                id="deliveryOptions"
                value={product.deliveryOption}
              />
            </div>
            <div className="data-subtitle">
              <AppDataText
                id="statusEntities"
                value={product.status.toString()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="column-menu col-auto  col-md-auto">
        <ActionsMenu>
          <Action
            component={Link}
            to={`${ROUTES.productEdit}/${product.id}`}
            label={intl.formatMessage({ id: "ui.actions.edit" })}
            icon={ICON_NAMES.bookmark}
          />
          <Action
            component="button"
            label={intl.formatMessage({ id: "ui.actions.delete" })}
            icon={ICON_NAMES.trash}
            onClick={handleDelete}
          />
        </ActionsMenu>
      </div>
    </div>
  );
}

export default Product;
