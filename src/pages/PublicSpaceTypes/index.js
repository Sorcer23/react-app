import { compose } from "recompose";
import { connect } from "react-redux";

import AppDataModule from "modules/appData";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import PublicSpaceTypes from "./PublicSpaceTypes";

export default compose(
  passAuthUser,
  pageLayout(),
  connect(state => {
    return {
      spaceTypes: AppDataModule.listSelector(state)("spaceTypes").spaceTypes
    };
  })
)(PublicSpaceTypes);
