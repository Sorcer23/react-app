import React from "react";
import { compose, withProps, lifecycle, withHandlers, branch } from "recompose";
import { withScriptjs, withGoogleMap } from "react-google-maps";

const withMap = (params = {}) => Component => {
  return compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%`, width: "100%" }} />,
      mapElement: params.showMap ? (
        <div style={{ height: `100%`, width: "100%" }} />
      ) : null
    }),
    withScriptjs,
    branch(props => params.showMap, withGoogleMap)
  )(Component);
};

export default withMap;
