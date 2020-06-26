import React from "react";
import { injectIntl } from "react-intl";

import EntitySLider from "./EntitySLider";

function ProviderEntities(props) {
  const { intl, title, titleIsEmpty, entities, entityName } = props;

  return (
    <div className="provider__row">
      <div className="provider__head">
        <div className="provider__section-title">{title}</div>
        {entities && entities.length !== 0 && entityName !== "sample" && (
          <button type="button" className="link">
            {intl.formatMessage({
              id: "ui.actions.show_all"
            })}
          </button>
        )}
      </div>
      {entities && entities.length === 0 && <p>{titleIsEmpty}</p>}
      <EntitySLider entities={entities} entityName={entityName} />
    </div>
  );
}

export default injectIntl(ProviderEntities);
