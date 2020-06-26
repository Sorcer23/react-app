import React from "react";
import { GoogleMap, Marker } from "react-google-maps";

import withMap from "HOC/withMap";

function AddressSideMap(props) {
  return (
    <GoogleMap
      defaultZoom={15}
      center={props.markerPosition}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        streetViewControl: false
      }}
    >
      <Marker position={props.markerPosition} />
    </GoogleMap>
  );
}

export default withMap({ showMap: true })(AddressSideMap);
