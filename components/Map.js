import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';

import markerImg from '../assets/track_end.png';

export default function Map(props) {
  const dimensions = Dimensions.get('window');
  const mapRef = useRef();
  const [myLatLongs, setMyLatLongs] = useState([]);
  const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

  useEffect(() => {
    retrieveLatLon();
  }, [props.vehicles]);

  function retrieveLatLon() {
    const _latLon = props.vehicles?.map(function (veh) {
      return {
        latitude: parseFloat(veh.Latitude),
        longitude: parseFloat(veh.Longitude),
      };
    });
    setMyLatLongs(_latLon);
  }

  const fitAllMarkers = () => {
    mapRef.current.fitToCoordinates(myLatLongs, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  return (
    <MapView
      ref={mapRef}
      mapType={Platform.OS === 'android' ? MAP_TYPES.NONE : MAP_TYPES.STANDARD}
      showsCompass
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      onMapReady={fitAllMarkers}>
      <UrlTile
        urlTemplate="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        maximumZ={10}
      />
      {props.vehicles.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.Latitude,
            longitude: marker.Longitude,
          }}
          image={markerImg}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
