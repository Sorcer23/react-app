import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ServiceTypes from "./ServiceTypes";

export default compose(
  passAuthUser,
  connect((state, props) => {
    const categoryId = props.match.params.id;

    return {
      services: state.appData.list.services.filter(
        service => service.categoryId.toString() === categoryId
      )
    };
  }),
  pageLayout(),
  injectIntl
)(ServiceTypes);
