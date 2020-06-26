import {
  compose,
  withProps,
  withReducer,
  withHandlers,
  withState,
  branch,
  renderComponent,
  withPropsOnChange
} from "recompose";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import AppDataModule from "modules/appData";
import ApiService from "services/api/ApiService";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";

import NotFound from "pages/NotFound";
import PagePreloader from "components/PagePreloader";
import ServiceProvider from "./ServiceProvider";

const initialState = {
  data: {},
  isLoading: true,
  isExist: true
};

export default compose(
  connect(state => {
    return {
      serviceTypes: AppDataModule.listSelector(state)("services").services,
      isMobile: state.common.windowWidth < 768
    };
  }),
  withProps(props => {
    return {
      serviceProviderId: props.match.params.id
    };
  }),
  withReducer(
    "serviceProvider",
    "dispatch",
    (state, action) => {
      const { type, payload } = action;

      switch (type) {
        case "GET_REQUEST":
          return { isLoading: true, isExist: false, data: {} };
        case "GET_FAILURE":
          return {
            ...state,
            isLoading: false,
            isExist: payload.errorType !== "NOT_FOUND"
          };
        case "GET_SUCCESS":
          return {
            ...state,
            isLoading: false,
            isExist: true,
            data: payload.data
          };
        default:
          return state;
      }
    },
    initialState
  ),
  withState("products", "setProducts", []),
  withState("services", "setServices", []),
  withState("posts", "setPosts", []),
  withHandlers({
    getData: ({ dispatch, serviceProviderId, ...props }) => async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        // const { serviceProvider } = props.isProviderPreview
        //   ? await ApiService.getServiceProvider(props.serviceProviderId)
        //   : await ApiService.getProduct(props.productId);

        ApiService.getServices({
          serviceProviderId,
          limit: 6
        }).then(({ success, list }) => props.setServices(list));
        ApiService.getProducts({
          serviceProviderId,
          limit: 6
        }).then(({ success, list }) => props.setProducts(list));
        ApiService.getPosts({
          serviceProviderId,
          limit: 6
        }).then(({ success, list }) => props.setPosts(list));

        // const data = await ApiService.getServices({ limit: 6 });
        // console.log(data);

        const { serviceProvider } = props.isProviderPreview
          ? await ApiService.getProviderAccount()
          : await ApiService.getServiceProvider(serviceProviderId);

        dispatch({
          type: "GET_SUCCESS",
          payload: { data: serviceProvider }
        });
      } catch (error) {
        dispatch({
          type: "GET_FAILURE",
          payload: {
            errorType: error.type
          }
        });
      }
    }
  }),
  withPropsOnChange(["serviceProviderId"], props => {
    props.getData();
  }),
  branch(
    props => props.serviceProvider.isLoading,
    renderComponent(PagePreloader)
  ),
  branch(props => !props.serviceProvider.isExist, renderComponent(NotFound)),
  passAuthUser,
  pageLayout(),
  injectIntl
)(ServiceProvider);
