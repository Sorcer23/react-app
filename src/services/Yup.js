import React from "react";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

Yup.setLocale({
  mixed: {
    required: <FormattedMessage id="ui.validation.required" />
  },
  string: {
    email: <FormattedMessage id="ui.validation.email" />,
    min: ({ min }) => (
      <FormattedMessage
        id="ui.validation.min_length"
        values={{ length: min }}
      />
    ),
    max: ({ max }) => (
      <FormattedMessage
        id="ui.validation.max_length"
        values={{ length: max }}
      />
    )
  }
});

export default Yup;
