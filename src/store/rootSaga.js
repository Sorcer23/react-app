import { all } from "redux-saga/effects";

import { sagas as appEnterSagas } from "modules/appEnter";
import { sagas as appDataSagas } from "modules/appData";
import { sagas as authSagas } from "modules/auth";
import { sagas as langSagas } from "modules/lang";
import { sagas as signupSagas } from "modules/signup";
import { sagas as accountSagas } from "modules/account";
import { sagas as providerAccountSagas } from "modules/providerAccount";
import { sagas as providerProductsSagas } from "modules/providerProducts";
import { sagas as providerServicesSagas } from "modules/providerServices";
import { sagas as providerPostsSagas } from "modules/providerPosts";

export default function* rootSaga() {
  yield all([
    appEnterSagas(),
    appDataSagas(),
    authSagas(),
    langSagas(),
    signupSagas(),
    accountSagas(),
    providerAccountSagas(),
    providerProductsSagas(),
    providerServicesSagas(),
    providerPostsSagas()
  ]);
}
