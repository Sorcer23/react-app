import React from "react";
import { Link } from "react-router-dom";

import ROTUES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";
import LinesEllipsis from "components/LinesEllipsis";
import AppDataText from "components/AppDataText";
import MultiLangContent from "components/MultiLangContent";
import getServerFileUrl from "utils/getServerFileUrl";

function EntityPreview(props) {
  const { entity } = props;

  const getUrl = () => {
    switch (entity.entityType) {
      case "product":
        return `${ROTUES.product}/${entity.id}`;
      case "service":
        return `${ROTUES.service}/${entity.id}`;
      default:
        return null;
    }
  };

  return (
    <div key={entity.id} className="product-item">
      <Link
        to={getUrl()}
        className="product-item__image"
        style={{
          backgroundImage: `url(${getServerFileUrl(entity.images[0])})`
        }}
      >
        {/* <Icon className="product-item__icon" name={ICON_NAMES.zoom} /> */}
      </Link>
      <div className="product-item__info">
        <div className="product-item__head">
          <h5 className="product-item__title">
            <MultiLangContent text={entity.title} />
          </h5>
          {/* <h5 className="product-item__provider">by <a className="product-item__provider-link" href="#">Home Centre</a></h5> */}
        </div>
        <div className="product-item__body">
          {entity.description && (
            <LinesEllipsis
              className="product-item__description"
              text={entity.description}
            >
              {/* <button type="button" className="read-more">Read More</button> */}
            </LinesEllipsis>
          )}
          <div className="product-item__bar">
            <div className="product-item__price">
              QRS{" "}
              <span className="product-item__price-value">{entity.price}</span>/
              <AppDataText id="priceUnit" value={entity.priceUnit} />
            </div>

            <div className="status status--requested">
              <Icon name={ICON_NAMES.check} active className="status__icon" />
              <div className="status__title">Requested</div>
            </div>

            {/* <div className="status status--enquired">
              <Icon className="status__icon" name={ICON_NAMES.question} />
              <div className="status__title">Enquire</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntityPreview;
