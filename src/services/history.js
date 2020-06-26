import { createBrowserHistory } from "history";

const history = createBrowserHistory({});

history.listen((location, action) => {
  const state = location.state || {};

  state.scrollToTop !== false && window.scrollTo(0, 0);
});

export default history;
