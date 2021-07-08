/* eslint-disable react-native/no-inline-styles */
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
import {Divider} from 'react-native-elements';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';

import markerImgAlarm from '../assets/markers/Alarm48.png';
import markerImgIdling from '../assets/markers/Idling48.png';
import markerImgNoGPS from '../assets/markers/NoGPS48.png';
import markerImgStarted from '../assets/markers/Started48.png';
import markerImgStopped from '../assets/markers/Stopped48.png';

import ListItemTitle from './ListItemTitle';

export default function Map(props) {
  const mapRef = useRef();
  const {markers, realTimes, realTimeDetails} = props;
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
      const _latLon = realTimes.map(function (veh) {
        return {
          latitude: parseFloat(veh.Latitude),
          longitude: parseFloat(veh.Longitude),
        };
      });
      setAllMarkersCoords(_latLon);
    };
    retrieveAllMarkersCoords();
  }, [markers, realTimes, realTimeDetails]);

  const fitToAllMarkersCoords = () => {
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

  const showModalMarkerData = marker => {
    const _realtime = realTimes.filter(rt => rt.id === marker.id);
    fitToOneMarkerCoords(_realtime[0]);
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
        onMapReady={fitToAllMarkersCoords}>
        <UrlTile urlTemplate="http://tile.stamen.com/toner/{z}/{x}/{y}.png" />
        {props.realTimes.map((rt, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: rt.Latitude,
              longitude: rt.Longitude,
            }}
            image={markerImg[rt.Status]}
            style={{
              transform: [
                {
                  rotate: `${rt.Heading}deg`,
                },
              ],
            }}
            onPress={() => showModalMarkerData(rt)}
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
            onPress={() => showModalMarkerData(marker)}>
            <Text>{marker.Plate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pressable>
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.3}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['up', 'left', 'right', 'down']}
          supportedOrientations={['portrait', 'landscape']}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerView}>
                <Text style={styles.modalText}>
                  {`${selectedMarker.Brand} ${selectedMarker.Model}`}
                </Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalText}>X</Text>
                </Pressable>
              </View>
              <View style={styles.bodyView}>
                <View style={[styles.titleColumnView]}>
                  <ListItemTitle
                    title="Dirección"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                  <ListItemTitle
                    title="F. posición"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                  <ListItemTitle
                    title="Km total"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                  <ListItemTitle
                    title="Km diario"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                  <ListItemTitle
                    title="F. parada"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                  <ListItemTitle
                    title="T. inactivo"
                    viewStyle={[
                      styles.titleLabelView,
                      {backgroundColor: colors.background},
                    ]}
                    textStyle={[
                      styles.titleLabeltext,
                      {
                        color: colors.primary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.infoColumnView} />
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
  bodyView: {
    flex: 1,
    flexDirection: 'row',
  },
  titleColumnView: {
    flex: 1,
    backgroundColor: 'wheat',
    width: '30%',
  },
  titleLabelView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '16.7%',
    width: '100%',
    borderBottomWidth: 1,
  },
  titleLabeltext: {
    fontSize: 15,
  },
  infoColumnView: {
    backgroundColor: 'pink',
    width: '70%',
  },
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
