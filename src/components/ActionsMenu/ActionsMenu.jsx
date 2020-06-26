import React from "react";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

import Icon, { ICON_NAMES } from "components/Icon";
import Action from "./Action";

function ActionsMenu(props) {
  const { children } = props;

  return (
    <Tooltip
      placement="bottomRight"
      prefixCls="actions-menu"
      trigger={["click"]}
      overlay={
        <div className="actions-menu__list">
          {children}
          {/* <div className="actions-menu__option">
            <Link
              to={`${ROUTES.productEdit}/${product.id}`}
              className='dropdown-action'
            >
              <Icon className="dropdown-action__icon" name={ICON_NAMES.bookmark} />

              {intl.formatMessage({ id: 'ui.actions.edit' })}
            </Link>
          </div>

          <div className="actions-menu__option">
            <button
              className='dropdown-action'
              type='button'
              onClick={handleDelete}>
              <Icon className="dropdown-action__icon" name={ICON_NAMES.trash} />

              {intl.formatMessage({ id: 'ui.actions.delete' })}
            </button>
          </div>
          <div className="actions-menu__option">
            <button
              className='dropdown-action'
              type='button'
              onClick={handleDelete}>
              <Icon className="dropdown-action__icon" name={ICON_NAMES.share} />

              {intl.formatMessage({ id: 'ui.actions.share' })}
            </button>
          </div> */}
        </div>
      }
    >
      <button type="button" className="button-option">
        <Icon name={ICON_NAMES.dots} />
      </button>
    </Tooltip>
  );
}

export default injectIntl(ActionsMenu);
