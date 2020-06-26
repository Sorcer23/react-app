import React from "react";
import { injectIntl } from "react-intl";
import {
  compose,
  withProps,
  lifecycle,
  withHandlers,
  withState
} from "recompose";
import classNames from "classnames";
import { GoogleMap, Marker } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { Field } from "formik";
import _ from "lodash";

import withMap from "HOC/withMap";
import Icon, { ICON_NAMES } from "components/Icon";
import Geocode from "services/Geocode";
import logger from "services/logger";

export default compose(
  injectIntl,
  withMap({ showMap: true }),
  // withState('bounds', 'setBounds', null),
  withState("center", "setCenter", { lat: 41.9, lng: -87.624 }),
  withState("markers", "setMarkers", []),
  withState("address", "setAddress", ""),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        // onBoundsChanged: () => {
        //   this.setState({
        //     bounds: refs.map.getBounds(),
        //     center: refs.map.getCenter(),
        //   })
        // },
        handleInputChange: event => {
          this.props.setAddress(event.target.value);
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.props.setCenter(nextCenter);
          this.props.setMarkers(places);
          this.props.setAddress(places[0] ? places[0].formatted_address : "");
          // refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withHandlers({
    handleSave: props => () => {
      props.onSave(formatPlaceAddress(props.markers[0]));
    },
    handleMapClick: props => position => {
      // console.log('click',position);

      Geocode.fromLatLng(position.latLng.lat(), position.latLng.lng()).then(
        response => {
          const place = response.results[0];

          props.setAddress(place.formatted_address);
          props.setMarkers([place]);
        },
        error => {
          logger(error);
        }
      );
    }
  })
)(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        streetViewControl: false
      }}
      clickableIcons={false}
      onClick={props.handleMapClick}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <div className="google-maps-search-wrapper">
          <div className="search-address">
            <div className="search-address__inner">
              <span className="search-address__button">
                <Icon name={ICON_NAMES.search} />
              </span>
              <input
                name="address1"
                placeholder={props.intl.formatMessage({
                  id: "ui.fields.search"
                })}
                className="search-address__input"
                value={props.address}
                onChange={props.handleInputChange}
              />
            </div>
            <button
              type="button"
              className={classNames("search-address__button-save btn", {
                "btn--disabled": props.markers[0] == null
              })}
              onClick={props.handleSave}
            >
              {props.intl.formatMessage({ id: "ui.actions.save" })}
            </button>
          </div>
        </div>
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: getLocationPoint(marker.geometry.location.lat),
            lng: getLocationPoint(marker.geometry.location.lng)
          }}
        />
      ))}
    </GoogleMap>
  );
});

const types = {
  route: "street",
  locality: "city",
  country: "country",
  neighborhood: "region",
  street_number: "streetnumber",
  administrative_area_level_1: "state",
  administrative_area_level_2: "district",
  postal_code: "aptNumber"
};

function formatPlaceAddress(place) {
  if (place == null) return null;

  const result = {};

  place.address_components.forEach(item => {
    Object.keys(types).forEach(key => {
      if (item.types.includes(key)) {
        Object.assign(result, {
          [types[key]]: item.long_name
        });
      }
    });
  });

  return Object.assign(result, {
    address1: place.formatted_address,
    lat: getLocationPoint(place.geometry.location.lat),
    lng: getLocationPoint(place.geometry.location.lng)
  });
}

function getLocationPoint(point) {
  return typeof point === "function" ? point() : point;
}
