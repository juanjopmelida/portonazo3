/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import Modal from 'react-native-modal';

import markerImgAlarm from '../assets/markers/Alarm48.png';
import markerImgIdling from '../assets/markers/Idling48.png';
import markerImgNoGPS from '../assets/markers/NoGPS48.png';
import markerImgStarted from '../assets/markers/Started48.png';
import markerImgStopped from '../assets/markers/Stopped48.png';

import LockedEngineImage from '../assets/buttons/LockedEngine.png';
import JourneysImage from '../assets/buttons/Journeys.png';
import GoToImage from '../assets/buttons/GoTo.png';

import RealtimeInfoTable from './RealtimeInfoTable';
import FloatingButton from './FloatingButton';
import Loading from './Loading';
import ModalMapStyles from './ModalMapStyles';
import RealtimeInfoTableButtonPad from '../components/RealtimeInfoTableButtonPad';

export default function Map(props) {
  const mapRef = useRef();
  const {navigation, markers, realTimes, realTimeDetails, addresses} = props;
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [user, setUser] = useState({});
  const [allMarkersCoords, setAllMarkersCoords] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectedRealTimeDetails, setSelectedRealTimeDetails] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [filteredRealTimes, setFilteredRealTimes] = useState(realTimes);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalMapTypesVisible, setIsModalMapTypesVisible] = useState(false);
  const DEFAULT_PADDING = {top: 40, right: 40, bottom: 80, left: 60};
  const DETAIL_PADDING = {top: 0, right: 40, bottom: 220, left: 40};
  const NUMBER_OF_BUTTONS = 3;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const markerImg = [
    markerImgAlarm,
    markerImgIdling,
    markerImgNoGPS,
    markerImgStarted,
    markerImgStopped,
  ];
  const {colors} = useTheme();
  const modalizeRef = useRef();

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
    setFilteredRealTimes(realTimes);
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
        latitude: marker.Latitude,
        longitude: marker.Longitude,
      },
    ];
    mapRef.current.fitToCoordinates(markerCoords, {
      edgePadding: DETAIL_PADDING,
      animated: true,
    });
  };

  const retrieveDataByMarkerId = (data, markerId) => {
    const retrievedData = data.filter(item => item.id === markerId).shift();
    return retrievedData;
  };

  const showModalMarkerData = id => {
    const marker = retrieveDataByMarkerId(markers, id);
    const realTime = retrieveDataByMarkerId(realTimes, id);
    const realTimeDetail = retrieveDataByMarkerId(realTimeDetails, id);
    const address = retrieveDataByMarkerId(addresses, id);
    setSelectedMarker(marker);
    setLocked(realTime.Locked);
    setSelectedRealTimeDetails(realTimeDetail);
    setSelectedAddress(address);
    fitToOneMarkerCoords(realTime);
    modalizeRef.current?.open();
  };

  const hideModalMarkerData = () => {
    fitToAllMarkersCoords();
  };

  const navigate = (screen, marker) => {
    hideModalMarkerData();
    navigation.navigate(screen, marker);
  };

  const setLockedRetarded = async () => {
    setTimeout(() => {
      setLocked(!locked);
    });
  };

  const setLockStatus = async () => {
    Alert.alert('Bloqueo Motor', '¿Desea activar el Bloqueo Motor?', [
      {
        text: 'NO',
        style: 'cancel',
      },
      {
        text: 'SI',
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            setLockedRetarded().then(res => {
              const status = res ? 'Desbloqueado' : 'Bloqueado';
              Alert.alert('Bloqueo Motor', 'El motor ha quedado ' + status);
            });
          }, 1000);
          setLoading(false);
        },
      },
    ]);
  };

  const toggleModalMapTypes = () => {
    setIsModalMapTypesVisible(!isModalMapTypesVisible);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        mapType={mapType}
        showsCompass
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        onMapReady={fitToAllMarkersCoords}>
        <UrlTile urlTemplate="http://tile.stamen.com/toner/{z}/{x}/{y}.png" />
        {filteredRealTimes.length > 0 &&
          filteredRealTimes.map((rt, index) => (
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
              onPress={() => showModalMarkerData(rt.id)}
            />
          ))}
      </MapView>
      <FloatingButton
        name={'layers-outline'}
        style={styles.fabMapStyles}
        onPress={toggleModalMapTypes}
      />
      <FloatingButton
        name={'filter-outline'}
        style={styles.fabFilter}
        onPress={() => navigation.navigate('filters', user)}
      />
      <Modal
        isVisible={isModalMapTypesVisible}
        onBackdropPress={toggleModalMapTypes}
        backdropOpacity={0.2}>
        <ModalMapStyles mapType={mapType} setMapType={setMapType} />
      </Modal>
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
        {markers &&
          markers.map((marker, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chipsItem,
                {backgroundColor: colors.backgroundGrey},
              ]}
              onPress={() => showModalMarkerData(marker.id)}>
              <Text style={{color: colors.text}}>{marker.Plate}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={500}
        modalHeight={SCREEN_HEIGHT / 1.8}
        onClose={hideModalMarkerData}
        HeaderComponent={
          <View
            style={[
              styles.headerView,
              {backgroundColor: colors.backgroundGrey},
            ]}>
            <Text style={[styles.modalText, {color: colors.text}]}>
              {`${selectedMarker.Brand} ${selectedMarker.Model}`}
            </Text>
          </View>
        }
        withHandle={false}
        overlayStyle={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        <Loading isVisible={loading} text="Localizando..." />
        <RealtimeInfoTable
          selectedAddress={selectedAddress}
          selectedRealTimeDetails={selectedRealTimeDetails}
        />
        <RealtimeInfoTableButtonPad
          selectedMarker={selectedMarker}
          setLockStatus={setLockStatus}
          navigate={navigate}
        />
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    shadowOpacity: 0.5,
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
  fabMapStyles: {
    top: Dimensions.get('window').height - 760,
    left: Dimensions.get('window').width - 60,
  },
  fabFilter: {
    top: Dimensions.get('window').height - 700,
    left: Dimensions.get('window').width - 60,
  },
});
