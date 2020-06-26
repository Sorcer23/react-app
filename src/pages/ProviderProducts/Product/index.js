import PropTypes from "prop-types";
import { compose, withHandlers, getContext } from "recompose";
import { injectIntl } from "react-intl";

import Product from "./Product";

export default compose(
  getContext({
    handleItemDelete: PropTypes.func
  }),
  withHandlers({
    handleDelete: props => () => {
      props.handleItemDelete(props.product.id);
    }
  }),
  injectIntl
)(Product);
