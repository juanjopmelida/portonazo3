import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
  Text,
  View,
  Pressable,
} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';

import markerImgAlarm from '../assets/markers/Alarm.png';
import markerImgIdling from '../assets/markers/Idling.png';
import markerImgNoGPS from '../assets/markers/NoGPS.png';
import markerImgStarted from '../assets/markers/Started.png';
import markerImgStopped from '../assets/markers/Stopped.png';

export default function Map(props) {
  const mapRef = useRef();
  const [markersCoords, setMarkersCoords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};
  const markerImg = [
    markerImgAlarm,
    markerImgIdling,
    markerImgNoGPS,
    markerImgStarted,
    markerImgStopped,
  ];

  useEffect(() => {
    const retrieveMarkersCoords = () => {
      const _latLon = props.vehicles?.map(function (veh) {
        return {
          latitude: parseFloat(veh.Latitude),
          longitude: parseFloat(veh.Longitude),
        };
      });
      setMarkersCoords(_latLon);
    };
    retrieveMarkersCoords();
  }, [props.vehicles]);

  const fitToMarkersCoords = () => {
    mapRef.current.fitToCoordinates(markersCoords, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        mapType={
          Platform.OS === 'android' ? MAP_TYPES.NONE : MAP_TYPES.STANDARD
        }
        showsCompass
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        onMapReady={fitToMarkersCoords}>
        <UrlTile urlTemplate="http://tile.stamen.com/toner/{z}/{x}/{y}.png" />
        {props.vehicles.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Latitude,
              longitude: marker.Longitude,
            }}
            image={markerImg[marker.Status]}
            title={marker.Registration}
            rotation={0.9}
            onPress={() => setModalVisible(!modalVisible)}
          />
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
