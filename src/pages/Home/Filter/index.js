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
    const appData = AppDataModule.listSelector(state)("style", "budget");

    return {
      appData
    };
  }),
  withFormik({
    name: "filter",
    mapPropsToValues: props => ({
      budgetId: [],
      styleId: []
    })
  })
)(Filter);
