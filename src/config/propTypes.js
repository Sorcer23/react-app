import PropTypes from "prop-types";

export const ImageShape = PropTypes.shape({
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});
