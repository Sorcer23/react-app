import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { compose, withState, getContext } from "recompose";
import { connect } from "react-redux";
import { withFormik } from "formik";

import AppDataModule from "modules/appData";
import Filter from "./Filter";

export default compose(
  getContext({
    resetFilter: PropTypes.func.isRequired,
    applyFilter: PropTypes.func.isRequired
  }),
  withState("isDropdownVisible", "setDropdownVisible", false),
  injectIntl,
  connect(state => {
    const appData = AppDataModule.listSelector(state)("colors");

    return {
      appData
    };
  }),
  withFormik({
    name: "filter",
    mapPropsToValues: props => ({
      colors: []
    })
  })
)(Filter);
