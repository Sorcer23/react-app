import React from "react";
import { connect } from "react-redux";

import Search from "components/Search";
import history from "services/history";
import ROUTES from "config/routes";

function SearchServices(props) {
  return (
    <Search
      isLocal
      apiLoadResults={query =>
        new Promise(resolve => {
          const list = props.services.filter(service =>
            service.label.toLowerCase().includes(query.toLowerCase())
          );

          resolve({
            list
          });
        })
      }
      onSelectQuery={service => {
        history.push(ROUTES.serviceRequestDetails);
      }}
    />
  );
}

export default connect(state => {
  return {
    services: state.appData.list.services
  };
})(SearchServices);
