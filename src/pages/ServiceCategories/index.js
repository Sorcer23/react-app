import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ServiceCategories from "./ServiceCategories";

export default compose(
  passAuthUser,
  connect((state, props) => {
    return {
      categories: state.appData.list.categories
    };
  }),
  pageLayout(),
  injectIntl
)(ServiceCategories);
