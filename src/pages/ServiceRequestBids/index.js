import React from "react";
import {
  compose,
  mapProps,
  withProps,
  withHandlers,
  withContext,
  withReducer,
  withPropsOnChange,
  withState
} from "recompose";
import { injectIntl } from "react-intl";
import queryString from "query-string";
import { connect } from "react-redux";

import logger from "services/logger";
import history from "services/history";
import ApiService from "services/api/ApiService";
import pageLayout from "HOC/pageLayout";
import withLoadMoreList from "HOC/withLoadMoreList";
import ServiceRequestBids from "./ServiceRequestBids";

export default compose(
  withProps(props => {
    return {
      serviceRequestId: props.match.params.id
    };
  }),
  withState("acceptedBid", "setAcceptedBid", null),
  withPropsOnChange(
    ["serviceRequestId"],
    async ({ serviceRequestId, setAcceptedBid }) => {
      try {
        const { request } = await ApiService.getServiceRequest(
          serviceRequestId
        );
        setAcceptedBid(request.acceptedId);
      } catch (error) {
        logger(error);
      }
    }
  ),
  C => props => {
    const C1 = withLoadMoreList({
      listName: "list",
      apiGetList: ApiService.getServiceRequestBids.bind(
        null,
        props.serviceRequestId
      )
    })(C);

    return <C1 {...props} />;
  },
  injectIntl,
  pageLayout()
)(ServiceRequestBids);
