import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import ApiService from "services/api";
import ROUTES from "config/routes";
import getServerFileUrl from "utils/getServerFileUrl";
import ActionsMenu, { Action } from "components/ActionsMenu";
import Icon, { ICON_NAMES } from "components/Icon";
import AppDataText from "components/AppDataText";
import Button from "components/Button";
import MultiLangContent from "components/MultiLangContent";
import ModalEntities from "./ModalEntities";

function Post(props) {
  const { intl, post, handleDelete, modals, openModal, closeModal } = props;

  const getEntityToShow = () => {
    if (modals.products) return "products";
    if (modals.services) return "services";
    return "";
  };

  return (
    <Fragment>
      <div className="row data-row">
        <div className="col-auto id-column">{post.id}</div>
        <div className="col  visible-mobile">
          <div className="data-title data-title--mobile">
            <MultiLangContent text={post.title} />
          </div>
        </div>
        <div className="data-column data-column--large col-12 col-md">
          <div className="row">
            <div className="col-sm-2 col-md-auto">
              {post.images.length > 0 && (
                <div className="data-image">
                  <img src={getServerFileUrl(post.images[0])} alt="" />
                </div>
              )}
            </div>

            <div className="data-column col-6 col-sm-5 col-md-3">
              <div className="data-title">
                <MultiLangContent text={post.title} />
              </div>
              <div className="data-subtitle">
                <AppDataText id="spaceTypes" value={post.spaceTypeId} />
              </div>
              <Button size="xs" onClick={() => openModal("products")}>
                List of products
              </Button>
            </div>

            <div className="data-column col-6  col-sm-5 col-md-4">
              <div className="data-subtitle">
                <AppDataText id="style" value={post.styleId} />
              </div>
              <div className="data-subtitle">
                <AppDataText id="budget" value={post.budgetId} />
              </div>
              <Button size="xs" onClick={() => openModal("services")}>
                List of services
              </Button>
            </div>

            <div className="data-column col-md-2">
              <AppDataText id="statusEntities" value={post.status.toString()} />
            </div>
          </div>
        </div>
        <div className="column-menu col-auto col-md-auto">
          <ActionsMenu>
            <Action
              component={Link}
              to={`${ROUTES.postEdit}/${post.id}`}
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
      <ModalEntities
        isOpen={modals.products || modals.services}
        onRequestClose={() => {
          closeModal("products");
          closeModal("services");
        }}
        entity={getEntityToShow()}
        postId={post.id}
        apiGetPost={ApiService.getProviderPost}
      />
    </Fragment>
  );
}

export default Post;
