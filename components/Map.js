import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';

export default function Map(props) {
  const dimensions = Dimensions.get('window');
  const ASPECT_RATIO = dimensions.width / dimensions.height;

  return (
    <MapView
      region={{
        latitude: 40.39332867,
        longitude: -3.54171669,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
      mapType={Platform.OS === 'android' ? MAP_TYPES.NONE : MAP_TYPES.STANDARD}
      zoomControlEnabled
      zoomEnabled
      zoomTapEnabled
      scrollEnabled
      rotateEnabled
      showsScale
      showsCompass
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      showsUserLocation>
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
