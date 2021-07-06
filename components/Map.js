import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';

import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import markerImgAlarm from '../assets/markers/Alarm48.png';
import markerImgIdling from '../assets/markers/Idling48.png';
import markerImgNoGPS from '../assets/markers/NoGPS48.png';
import markerImgStarted from '../assets/markers/Started48.png';
import markerImgStopped from '../assets/markers/Stopped48.png';

export default function Map(props) {
  const mapRef = useRef();
  const {markers} = props;
  const [allMarkersCoords, setAllMarkersCoords] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const DEFAULT_PADDING = {top: 40, right: 40, bottom: 80, left: 60};
  const DETAIL_PADDING = {top: 0, right: 40, bottom: 220, left: 40};
  const markerImg = [
    markerImgAlarm,
    markerImgIdling,
    markerImgNoGPS,
    markerImgStarted,
    markerImgStopped,
  ];
  const {colors} = useTheme();

  useEffect(() => {
    const retrieveAllMarkersCoords = () => {
      const _latLon = markers.map(function (veh) {
        return {
          latitude: parseFloat(veh.Latitude),
          longitude: parseFloat(veh.Longitude),
        };
      });
      setAllMarkersCoords(_latLon);
    };
    retrieveAllMarkersCoords();
  }, [markers]);

  const fitToMarkersCoords = () => {
    mapRef.current.fitToCoordinates(allMarkersCoords, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  const fitToOneMarkerCoords = marker => {
    const markerCoords = [
      {
        latitude: parseFloat(marker.Latitude),
        longitude: parseFloat(marker.Longitude),
      },
    ];
    mapRef.current.fitToCoordinates(markerCoords, {
      edgePadding: DETAIL_PADDING,
      animated: true,
    });
  };

  const showMarkerData = marker => {
    fitToOneMarkerCoords(marker);
    setSelectedMarker(marker);
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
        {props.markers.map((marker, index) => (
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
                  rotate: `${marker.Direction}deg`,
                },
              ],
            }}
            onPress={() => showMarkerData(marker)}
          />
        ))}
      </MapView>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {props.markers.map((marker, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chipsItem}
            onPress={() => showMarkerData(marker)}>
            <Text>{marker.Registration}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pressable>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="left"
          supportedOrientations={['portrait', 'landscape']}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerView}>
                <Text style={styles.modalText}>
                  {`${selectedMarker.Manufacturer} ${selectedMarker.Model}`}
                </Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalText}>X</Text>
                </Pressable>
              </View>
              <View>
                <View style={{borderBottomColor: colors.backgroundGrey}}>
                  <Text style={styles.modalText}>Matrícula:</Text>
                </View>
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
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
  },
  bodyView: {},
  rowView: {},
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    padding: 15,
    textAlign: 'center',
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
