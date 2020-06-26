import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";

import { reducer as appEnter } from "modules/appEnter";
import { reducer as appData } from "modules/appData";
import { reducer as common } from "modules/common";
import { reducer as form } from "modules/form";
import { reducer as modal } from "modules/modal";
import { reducer as auth } from "modules/auth";
import { reducer as lang } from "modules/lang";
import { reducer as signup } from "modules/signup";
import { reducer as account } from "modules/account";
import { reducer as providerAccount } from "modules/providerAccount";
import { reducer as providerProducts } from "modules/providerProducts";
import { reducer as providerServices } from "modules/providerServices";
import { reducer as providerPosts } from "modules/providerPosts";
import { reducer as events } from "modules/events";

export default combineReducers({
  appEnter,
  appData,
  notifications,
  common,
  form,
  modal,
  auth,
  lang,
  signup,
  account,
  providerAccount,
  providerProducts,
  providerServices,
  providerPosts,
  events
});
