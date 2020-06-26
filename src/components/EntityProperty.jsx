import React, { Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { compose } from "recompose";

import AppDataText from "components/AppDataText";

function EntityProperty(props) {
  const { intl, appData, title, value, isRtl } = props;

  const formatValue = value => {
    if (typeof value === "boolean") {
      return intl.formatMessage({
        id: value ? "ui.common.yes" : "ui.common.no"
      });
    }

    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Fragment key={item}>
          <AppDataText id={appData} value={item} />
          {index !== value.length - 1 ? ", " : ""}
        </Fragment>
      ));
    }

    if (appData) {
      return <AppDataText id={appData} value={value} />;
    }

    return value;
  };

  if (value === "" || value == null) return null;

  return (
    <tr>
      {isRtl ? (
        <td className="product-specification__value">{formatValue(value)}</td>
      ) : (
        <td className="product-specification__title">
          {intl.formatMessage({ id: title })}:
        </td>
      )}
      {isRtl ? (
        <td className="product-specification__title">
          :{intl.formatMessage({ id: title })}
        </td>
      ) : (
        <td className="product-specification__value">{formatValue(value)}</td>
      )}
    </tr>
  );
}

export default compose(
  injectIntl,
  connect(state => {
    return {
      isRtl: state.lang.locale === "ar"
    };
  })
)(EntityProperty);
