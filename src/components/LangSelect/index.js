import { compose, mapProps, withHandlers } from "recompose";
import { connect } from "react-redux";

import LangModuke from "modules/lang";
import LangSelect from "./LangSelect";

export default compose(
  connect(
    state => {
      const { list, locale } = state.lang;

      return {
        list,
        locale
      };
    },
    {
      setLang: LangModuke.setActive
    }
  ),
  mapProps(({ list, locale, ...props }) => {
    return {
      ...props,
      options: list,
      value: list.find(l => l.value === locale)
    };
  }),
  withHandlers({
    onChange: props => lang => props.setLang(lang.value)
  })
)(LangSelect);
