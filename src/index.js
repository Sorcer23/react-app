import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import Modal from "react-modal";
import { IntlProvider } from "react-intl";
import queryString from "query-string";

import "styles/style.scss";

import ROUTES from "config/routes";
import store, { persistor } from "store";
import history from "services/history";
import AppEnterModule from "modules/appEnter";
import Notice from "components/Notice";
import ModalsContainer from "components/modals/ModalsContainer";
import PagePreloader from "components/PagePreloader";
import NotFound from "pages/NotFound";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import AuthByToken from "pages/AuthByToken";
import RestorePassword from "pages/RestorePassword";
import Account from "pages/Account";
import AccountNotifications from "pages/AccountNotifications";
import AccountAddresses from "pages/AccountAddresses";

import AdminPanelPreview from "pages/AdminPanelPreview";

import AddProduct from "pages/ProviderAddProduct";
import AddService from "pages/ProviderAddService";
import AddPost from "pages/ProviderAddPost";
import ProviderProducts from "pages/ProviderProducts";
import ProviderServices from "pages/ProviderServices";
import ProviderPosts from "pages/ProviderPosts";

import Shop from "pages/Shop";
import PublicPost from "pages/PublicPost";
import PublicProduct from "pages/PublicProduct";
import PublicService from "pages/PublicService";
import ServiceProviders from "pages/ServiceProviders";
import ServiceProvider from "pages/ServiceProvider";
import ServiceCategories from "pages/ServiceCategories";
import ServiceTypes from "pages/ServiceTypes";

import TermsConditions from "pages/TermsConditions";
import PrivacyPolicy from "pages/PrivacyPolicy";

import AdminDashboard from "pages/AdminDashboard";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";
import RequestDetails from "pages/RequestDetails";
import ServiceRequestNew from "pages/ServiceRequestNew";
import ServiceRequestEdit from "pages/ServiceRequestEdit";
import ServiceRequestList from "pages/ServiceRequestList";
import ServiceRequestView from "pages/ServiceRequestView";
import ServiceRequestResponse from "pages/ServiceRequestResponse";
import ServiceRequestResponseView from "pages/ServiceRequestResponseView";
import ServiceRequestBids from "pages/ServiceRequestBids";
import ServiceRequestReview from "pages/ServiceRequestReview";

import ServiceProviderVerification from "pages/ServiceProviderVerification";
import RequestsListUser from "pages/RequestsListUser";
import RequestsListSP from "pages/RequestsListSP";
import ResponseForm from "pages/ResponseForm";

import PageListHtml from "html/templates/PageListHtml";
import SignUpHtml from "html/templates/SignUp";
import SignUp2Html from "html/templates/SignUp2";
import SignUp3Html from "html/templates/SignUp3";
import SignUp4Html from "html/templates/SignUp4";
import ProfileHtml from "html/templates/Profile";
import SignInNumber from "html/templates/SignInNumber";
import NewUser from "html/templates/NewUser";
import NewPassword from "html/templates/NewPassword";
import ForgotPassword from "html/templates/ForgotPassword";
import CustomerAddress from "html/templates/CustomerAddress";
import SPAddProduct from "html/templates/SPAddProduct";
import SPAddService from "html/templates/SPAddService";
import SPAddPostHtml from "html/templates/SPAddPost";
import GeneralHtml from "html/templates/General";
import SPProductList from "html/templates/SPProductList";

Modal.setAppElement(`#root`);

function App(props) {
  const { locale, dictionary, isLoaded } = props;

  const location = useLocation();
  const { dictionary: dictionaryMode } = queryString.parse(location.search);

  useEffect(() => {
    props.initApp();
  }, []);

  if (!isLoaded) return <PagePreloader />;

  return (
    <IntlProvider
      locale={locale}
      messages={dictionaryMode === "true" ? {} : dictionary}
    >
      <Fragment>
        <Switch>
          <Route exact path={ROUTES.home} component={Home} />
          <Route exact path={ROUTES.signup} component={SignUp} />
          <Route exact path={ROUTES.signin} component={SignIn} />
          <Route
            exact
            path={ROUTES.restorePassword}
            component={RestorePassword}
          />
          <Route
            exact
            path={`${ROUTES.authByToken}/:token`}
            component={AuthByToken}
          />
          <Route exact path={ROUTES.account} component={Account} />
          <Route
            exact
            path={ROUTES.accountAdresses}
            component={AccountAddresses}
          />
          <Route
            exact
            path={ROUTES.accountNotifications}
            component={AccountNotifications}
          />

          <Route
            exact
            path={ROUTES.adminPanelPreview}
            component={AdminPanelPreview}
          />

          <Route exact path={ROUTES.productAdd} component={AddProduct} />
          <Route
            exact
            path={`${ROUTES.productEdit}/:id`}
            render={props => <AddProduct {...props} isEdit />}
          />
          <Route exact path={ROUTES.serviceAdd} component={AddService} />
          <Route
            exact
            path={`${ROUTES.serviceEdit}/:id`}
            render={props => <AddService {...props} isEdit />}
          />
          <Route exact path={ROUTES.postAdd} component={AddPost} />
          <Route
            exact
            path={`${ROUTES.postEdit}/:id`}
            render={props => <AddPost {...props} isEdit />}
          />
          <Route
            exact
            path={ROUTES.providerProducts}
            component={ProviderProducts}
          />
          <Route
            exact
            path={`${ROUTES.providerProductPreview}/:id`}
            render={props => <PublicProduct {...props} isProviderPreview />}
          />
          <Route
            exact
            path={ROUTES.providerServices}
            component={ProviderServices}
          />
          <Route
            exact
            path={`${ROUTES.providerServicePreview}/:id`}
            render={props => <PublicService {...props} isProviderPreview />}
          />
          <Route exact path={ROUTES.providerPosts} component={ProviderPosts} />
          <Route
            exact
            path={`${ROUTES.providerPostPreview}/:id`}
            render={props => <PublicPost {...props} isProviderPreview />}
          />

          <Route
            exact
            path={`${ROUTES.product}/:id`}
            component={PublicProduct}
          />
          <Route
            exact
            path={`${ROUTES.service}/:id`}
            component={PublicService}
          />
          <Route path={`${ROUTES.shop}`} component={Shop} />

          <Route exact path={`${ROUTES.post}/:id`} component={PublicPost} />

          <Route
            exact
            path={`${ROUTES.serviceProviders}`}
            component={ServiceProviders}
          />
          <Route
            exact
            path={`${ROUTES.serviceProviderPreview}/:id`}
            render={props => <ServiceProvider {...props} isProviderPreview />}
          />
          <Route
            exact
            path={`${ROUTES.serviceProvider}/:id`}
            component={ServiceProvider}
          />
          <Route
            exact
            path={`${ROUTES.serviceCategories}`}
            component={ServiceCategories}
          />
          <Route
            exact
            path={`${ROUTES.serviceTypes}/:id`}
            component={ServiceTypes}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestNew}/:serviceTypeId/:serviceId?`}
            component={ServiceRequestNew}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestEdit}/:id`}
            component={ServiceRequestEdit}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestList}`}
            component={ServiceRequestList}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestView}/:id/:responseId?`}
            component={ServiceRequestView}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestViewByProvider}/:id`}
            render={props => <ServiceRequestView {...props} byProvider />}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestResponse}/:id`}
            component={ServiceRequestResponse}
          />
          <Route
            exact
            path={`${ROUTES.serviceResponseView}/:id`}
            component={ServiceRequestResponseView}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestBids}/:id`}
            component={ServiceRequestBids}
          />
          <Route
            exact
            path={`${ROUTES.serviceRequestReview}/:id`}
            component={ServiceRequestReview}
          />

          <Route
            exact
            path={ROUTES.termsConditions}
            component={TermsConditions}
          />
          <Route exact path={ROUTES.privacyPolicy} component={PrivacyPolicy} />
          <Route
            exact
            path={ROUTES.serviceProviderVerification}
            component={ServiceProviderVerification}
          />
          <Route
            exact
            path={ROUTES.requestsListUser}
            component={RequestsListUser}
          />
          <Route
            exact
            path={ROUTES.requestsListSP}
            component={RequestsListSP}
          />
          <Route exact path={ROUTES.responseForm} component={ResponseForm} />

          <Route
            exact
            path={ROUTES.adminDashboard}
            component={AdminDashboard}
          />
          <Route exact path={ROUTES.aboutUs} component={AboutUs} />
          <Route exact path={ROUTES.contactUs} component={ContactUs} />
          <Route exact path="/request-details" component={RequestDetails} />

          <Route exact path="/html" component={PageListHtml} />
          <Route exact path="/html/sign-up" component={SignUpHtml} />
          <Route exact path="/html/sign-up-2" component={SignUp2Html} />
          <Route exact path="/html/sign-up-3" component={SignUp3Html} />
          <Route exact path="/html/sign-up-4" component={SignUp4Html} />
          <Route exact path="/html/profile" component={ProfileHtml} />
          <Route exact path="/html/new-user" component={NewUser} />
          <Route exact path="/html/sign-in-number" component={SignInNumber} />
          <Route exact path="/html/new-password" component={NewPassword} />
          <Route
            exact
            path="/html/forgot-password"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/html/customer-address"
            component={CustomerAddress}
          />
          <Route exact path="/html/sp-add-product" component={SPAddProduct} />
          <Route exact path="/html/sp-add-service" component={SPAddService} />
          <Route exact path="/html/sp-add-post" component={SPAddPostHtml} />
          <Route exact path="/html/general" component={GeneralHtml} />
          <Route exact path="/html/sp-product-list" component={SPProductList} />

          <Route component={NotFound} />
        </Switch>

        <Notice />
        <ModalsContainer />
        <PagePreloader connected />
      </Fragment>
    </IntlProvider>
  );
}

const ConnectedApp = connect(
  state => {
    return {
      locale: state.lang.locale,
      dictionary: state.lang.dictionary,
      isLoaded: state.appEnter.isLoaded
    };
  },
  {
    initApp: AppEnterModule.init
  }
)(App);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<PagePreloader />} persistor={persistor}>
      <Router history={history}>
        <ConnectedApp />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
