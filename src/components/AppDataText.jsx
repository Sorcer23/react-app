import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppDataModule from "modules/appData";

function AppDataText(props) {
  return props.label;
}

AppDataText.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default connect((state, props) => {
  const data = AppDataModule.listSelector(state)(props.id)[props.id].find(
    entity => entity != null && entity.value === props.value
  );

  return {
    label: data == null ? null : data.label
  };
})(AppDataText);
