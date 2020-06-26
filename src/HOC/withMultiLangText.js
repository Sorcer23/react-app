import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";

import ROUTES from "config/routes";

function getMultiValue(text, lang) {
  if (!text) return null;

  if (typeof text !== "object" || text == null) return text;

  return text[lang] || text["en"];
}

function withMultiLangText(Component) {
  return function(props) {
    const { text, lang, dispatch, ...restProps } = props;

    return <Component {...restProps} text={getMultiValue(text, lang)} />;
  };
}

export default compose(
  connect(state => {
    return {
      lang: state.lang.locale
    };
  }),
  withMultiLangText
);
