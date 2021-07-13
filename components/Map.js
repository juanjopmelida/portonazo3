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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';

import markerImgAlarm from '../assets/markers/Alarm48.png';
import markerImgIdling from '../assets/markers/Idling48.png';
import markerImgNoGPS from '../assets/markers/NoGPS48.png';
import markerImgStarted from '../assets/markers/Started48.png';
import markerImgStopped from '../assets/markers/Stopped48.png';

import ListItemTitle from './ListItemTitle';

export default function Map(props) {
  const mapRef = useRef();
  const {navigation, markers, realTimes, realTimeDetails, addresses} = props;
  const [user, setUser] = useState({});
  const [allMarkersCoords, setAllMarkersCoords] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectedRealTime, setSelectedRealTime] = useState({});
  const [selectedRealTimeDetails, setSelectedRealTimeDetails] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
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
  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const retrieveUserFromStorage = async () => {
    const _user = await AsyncStorage.getItem('USER');
    if (_user) {
      const parseUser = JSON.parse(_user);

      setUser({
        username: parseUser.username,
        password: parseUser.password,
      });
    }
  };

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
    retrieveUserFromStorage();
  }, [markers, realTimes, realTimeDetails, addresses]);

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

  const retrieveDataByMarker = (data, marker) => {
    const retrievedData = data.filter(item => item.id === marker.id).shift();
    return retrievedData;
  };

  const showModalMarkerData = marker => {
    setSelectedMarker(marker);
    const realTime = retrieveDataByMarker(realTimes, marker);
    const realTimeDetail = retrieveDataByMarker(realTimeDetails, marker);
    const address = retrieveDataByMarker(addresses, marker);
    setSelectedRealTime(realTime);
    setSelectedRealTimeDetails(realTimeDetail);
    setSelectedAddress(address);
    fitToOneMarkerCoords(realTime);
    modalizeRef.current?.open();
  };

  const hideModalMarkerData = () => {
    setModalVisible(false);
    fitToAllMarkersCoords();
  };

  const navigate = screen => {
    hideModalMarkerData();
    navigation.navigate(screen, user);
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
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={500}
        HeaderComponent={
          <View style={styles.headerView}>
            <Text style={styles.modalText}>
              {`${selectedMarker.Brand} ${selectedMarker.Model}`}
            </Text>
          </View>
        }
        withHandle={false}>
        <View style={styles.bodyView}>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="Dirección"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedAddress.Address}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="F. posición"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedRealTimeDetails.PositionDate}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="Km total"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedRealTimeDetails.TotalKm}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="Km diario"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedRealTimeDetails.DailyKm}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="F. parada"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedRealTimeDetails.StopDate}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.bodyRowView}>
            <ListItemTitle
              title="T. inactivo"
              viewStyle={[
                styles.listItemView,
                styles.listItemTitleView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemTitleText,
                {
                  color: colors.primary,
                },
              ]}
            />
            <ListItemTitle
              title={selectedRealTimeDetails.InactivePeriod}
              viewStyle={[
                styles.listItemView,
                {backgroundColor: colors.background},
              ]}
              textStyle={[
                styles.listItemInfoText,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>

          <View
            style={{
              width: '100%',
              height: 45,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}>
            <Pressable
              style={styles.button}
              onPress={() => navigate('journeys', user)}>
              <Icon
                type="material-community"
                name="crosshairs-gps"
                size={25}
                color={colors.menuButtonContent}
              />
              <Text style={[styles.text, {color: colors.menuButtonContent}]}>
                Tiempo Real
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigate('journeys', user)}>
              <Icon
                type="material-community"
                name="crosshairs-gps"
                size={25}
                color={colors.menuButtonContent}
              />
              <Text style={[styles.text, {color: colors.menuButtonContent}]}>
                Tiempo Real
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigate('journeys', user)}>
              <Icon
                type="material-community"
                name="crosshairs-gps"
                size={25}
                color={colors.menuButtonContent}
              />
              <Text style={[styles.text, {color: colors.menuButtonContent}]}>
                Tiempo Real
              </Text>
            </Pressable>
          </View>
        </View>
      </Modalize>
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
  bodyRowView: {
    flexDirection: 'row',
    height: 30,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
  },
  listItemTitleView: {
    width: '30%',
    paddingLeft: 15,
  },
  listItemTitleText: {
    fontSize: 15,
  },
  listItemView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  listItemInfoText: {
    fontSize: 13,
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
  button: {
    width: '33%',
    height: '100%',
    backgroundColor: '#585958',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
