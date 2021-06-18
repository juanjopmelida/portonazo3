import React, {useState} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';


export default function Map(props) {
  const [vehicles, setvehicles] = useState(props.vehicles)

  console.log(props.vehicles[0].Latitude)

  return (
    <MapView
      region={{
        latitude: -33.42778539,
        longitude: -70.62713,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
      mapType={Platform.OS == 'android' ? 'none' : 'standard'}
      zoomControlEnabled
      zoomEnabled
      zoomTapEnabled
      rotateEnabled
      showsCompass
      provider={PROVIDER_DEFAULT}
      mapType={MAP_TYPES.STANDARD}
      style={styles.map}
      showsUserLocation>
      <UrlTile
        urlTemplate="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        maximumZ={10}
      />
      {/* <Marker
            coordinate={{
              latitude: props.vehicles[0].Latitude,
              longitude: props.vehicles[0].Longitude
            }}
          /> */}
      {/* {
        vehicles.map((marker, index) => (
          <Marker
          key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          />
        ))
      } */}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
