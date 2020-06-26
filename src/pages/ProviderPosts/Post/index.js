import { compose, withHandlers, getContext } from "recompose";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import withModal from "HOC/withModal";
import Post from "./Post";

export default compose(
  getContext({
    handleItemDelete: PropTypes.func
  }),
  withHandlers({
    handleDelete: props => () => {
      props.handleItemDelete(props.post.id);
    }
  }),
  injectIntl,
  withModal("products", "services")
)(Post);
