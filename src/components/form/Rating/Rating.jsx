import React, { Fragment } from "react";
import ReactRating from "react-rating";

import withField from "HOC/withField";
import Icon, { ICON_NAMES } from "components/Icon";

function Rating(props) {
  const { field, form, error } = props;

  return (
    <div className="field field-rating">
      <div className="field__data field-rating__data">
        <span className="field-error field-rating__error">{error}</span>
        <ReactRating
          initialRating={field.value}
          onChange={value => form.setFieldValue(field.name, value)}
          emptySymbol={<Icon name={ICON_NAMES.star} />}
          fullSymbol={<Icon name={ICON_NAMES.star} active />}
        />
      </div>
    </div>
  );
}

export default withField(Rating);
