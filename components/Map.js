import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';

import markerImgAlarm from '../assets/markers/Alarm48.png';
import markerImgIdling from '../assets/markers/Idling48.png';
import markerImgNoGPS from '../assets/markers/NoGPS48.png';
import markerImgStarted from '../assets/markers/Started48.png';
import markerImgStopped from '../assets/markers/Stopped48.png';

export default function Map(props) {
  const mapRef = useRef();
  const [markersCoords, setMarkersCoords] = useState([]);
  const [selectMarker, setSelectMarker] = useState({});
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

  const showMarkerData = marker => {
    setSelectMarker(marker);
    setModalVisible(true);
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
            style={{
              transform: [
                {
                  rotate: `${marker.Direction}deg`
                }
              ]
            }}
            onPress={() => showMarkerData(marker)}
          >
          </Marker>
        ))}
      </MapView>
      <Pressable onPress={() => setModalVisible(false)}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerView}>
                <Text style={styles.modalText}>
                  {`${selectMarker.Manufacturer} ${selectMarker.Model}`}
                </Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalText}>X</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Pressable>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
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
    padding: 15,
    textAlign: 'center',
  },
});
