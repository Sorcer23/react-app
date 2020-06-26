import store from "store";
import produce from "immer";
import { debounce } from "throttle-debounce";
import objectFitImages from "object-fit-images";
import scrollbarWidth from "scrollbar-width";
import MobileDetect from "mobile-detect";
import { takeEvery, takeLatest } from "redux-saga/effects";

const WINDOW_RESIZE = "COMMON/WINDOW_RESIZE";
const WINDOW_SCROLL = "COMMON/WINDOW_SCROLL";
const SET_SCROLLBAR_WIDTH = "COMMON/SET_SCROLLBAR_WIDTH";
const ENABLE_PAGE_SCROLL = "COMMON/ENABLE_PAGE_SCROLL";
const DISABLE_PAGE_SCROLL = "COMMON/DISABLE_PAGE_SCROLL";
const START_PAGE_LOADING = "COMMON/START_PAGE_LOADING";
const FINISH_PAGE_LOADING = "COMMON/FINISH_PAGE_LOADING";
const MOBILE_DETECT = "COMMON/MOBILE_DETECT";

const initialState = {
  isPageScrollable: true,
  isPageLoading: false,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  scrollbarWidth: 0,
  mobileDevice: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case START_PAGE_LOADING:
        draft.isPageLoading = true;
        break;

      case FINISH_PAGE_LOADING:
        draft.isPageLoading = false;
        break;

      case WINDOW_RESIZE:
        draft.windowWidth = payload.windowWidth;
        break;

      case SET_SCROLLBAR_WIDTH:
        draft.scrollbarWidth = payload.width;
        break;

      case MOBILE_DETECT:
        draft.mobileDevice = payload.device;
        break;
    }
  });

// actions
const startPageLoading = () => ({ type: START_PAGE_LOADING });
const finishPageLoading = () => ({ type: FINISH_PAGE_LOADING });

// sagas

const enableBodyScroll = () => (dispatch, getState) => {
  const docBody = document.getElementsByTagName("body")[0];
  docBody.classList.remove("scroll-none");
  docBody.removeAttribute("style");
  dispatch({ type: ENABLE_PAGE_SCROLL });
};

const disableBodyScroll = () => (dispatch, getState) => {
  const docBody = document.getElementsByTagName("body")[0];
  docBody.classList.add("scroll-none");
  docBody.style.marginRight = `${getState().common.scrollbarWidth}px`;
  dispatch({ type: DISABLE_PAGE_SCROLL });
};

// Common handlers
function handleWindowResize(event) {
  store.dispatch({
    type: WINDOW_RESIZE,
    payload: {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  });
}

function handleDOMLoaded(event) {
  const device = new MobileDetect(window.navigator.userAgent);
  objectFitImages();
  store.dispatch({
    type: MOBILE_DETECT,
    payload: { device: device.mobile() }
  });
  store.dispatch({
    type: SET_SCROLLBAR_WIDTH,
    payload: { width: scrollbarWidth() }
  });
}

window.addEventListener("resize", debounce(250, handleWindowResize));
window.addEventListener("DOMContentLoaded", handleDOMLoaded);

export { reducer };

export default {
  enableBodyScroll,
  disableBodyScroll,
  startPageLoading,
  finishPageLoading
};
