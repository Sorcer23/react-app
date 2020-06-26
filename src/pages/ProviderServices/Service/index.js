import PropTypes from "prop-types";
import { compose, withHandlers, getContext } from "recompose";
import { injectIntl } from "react-intl";

import ApiService from "services/api/ApiService";
import Service from "./Service";

export default compose(
  getContext({
    handleItemDelete: PropTypes.func
  }),
  withHandlers({
    handleDelete: props => () => {
      props.handleItemDelete(props.service.id);
    }
  }),
  injectIntl
)(Service);
