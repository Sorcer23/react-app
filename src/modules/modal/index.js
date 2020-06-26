import MODAL_NAMES from "./modalNames";
import CommonModule from "modules/common";

const SHOW = "MODAL/SHOW";
const HIDE = "MODAL/HIDE";

const initialState = {
  name: null,
  isOpen: false,
  onClose: null,
  params: {}
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW:
      return {
        name: payload.name,
        isOpen: true,
        onClose: payload.onClose,
        params: payload.params
      };
    case HIDE:
      return initialState;
    default:
      return state;
  }
};

// Actions
const show = ({ name, onClose, params }) => ({
  type: SHOW,
  payload: { name, onClose, params }
});
// dispatch(CommonModule.disableBodyScroll());
// dispatch(CommonModule.enableBodyScroll());

const hide = () => ({ type: HIDE });

export { reducer, MODAL_NAMES };

export default {
  show,
  hide
};
