import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "config/routes";
import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";
import AppDataText from "components/AppDataText";
import ActionsMenu, { Action } from "components/ActionsMenu";
import MultiLangContent from "components/MultiLangContent";

function Service(props) {
  const { intl, service, handleDelete } = props;

  return (
    <div className="row data-row">
      <div className="col-auto id-column">{service.id}</div>
      <div className="col  visible-mobile">
        <div className="data-title data-title--mobile">
          <MultiLangContent text={service.title} />
        </div>
      </div>
      <div className="data-column data-column--large col-12 col-md">
        <div className="row">
          <div className="col-sm-2 col-md-auto">
            {service.images.length > 0 && (
              <div className="data-image">
                <img src={getServerFileUrl(service.images[0])} alt="" />
              </div>
            )}
          </div>

          <div className="data-column col-6 col-sm-3">
            <div className="data-title">
              <MultiLangContent text={service.title} />
            </div>
            <div className="data-subtitle">
              <AppDataText id="categories" value={service.serviceCategoryId} />
            </div>
            <div className="data-subtitle">
              {intl.formatMessage({ id: "ui.fields.price" })}:
              {" " + service.price}
              {" " + intl.formatMessage({ id: "ui.common.per" }) + " "}
              <AppDataText id="priceUnit" value={service.priceUnit} />
            </div>
          </div>

          <div className="data-column col-6 col-sm-3">
            <div className="data-subtitle">
              <AppDataText id="services" value={service.serviceTypeId} />
            </div>
          </div>

          <div className="data-column col-md-2">
            <AppDataText
              id="statusEntities"
              value={service.status.toString()}
            />
          </div>
        </div>
      </div>
      <div className="column-menu col-auto  col-md-auto">
        <ActionsMenu>
          <Action
            component={Link}
            to={`${ROUTES.serviceEdit}/${service.id}`}
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

export default Service;
