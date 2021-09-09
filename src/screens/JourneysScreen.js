import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import randomColor from 'randomcolor';
import moment from 'moment';
import Modal from 'react-native-modal';

// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

// MARKERS
import startJourneyMarker from '../assets/markers/track_start.png';
import endJourneyMarker from '../assets/markers/track_end.png';

import globalStyles from '../styles/global';
import Loading from '../components/Loading';
import {getJourneys} from '../api';
import FilterSelector from '../components/FilterSelector';
import FiltersView from '../components/FiltersView';
import JourneysSelector from '../components/JourneysSelector';
import ModalVehiclesFilter from '../components/ModalVehiclesFilter';
import {getTodayStartDate, getTodayEndDate} from '../utils';

export default function JourneysScreen(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const mapRef = useRef();
  const [loading, setLoading] = useState(false);
  const [journeys, setJourneys] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalVehiclesFilterVisible, setIsModalVehiclesFilterVisible] =
    useState(false);
  const [noOfRenders, setNoOfRenders] = useState(0);
  const [isMoreThanOneVehicle, setIsMoreThanOneVehicle] = useState(false);

  useEffect(() => {
    const _isMoreThanOneVehicle =
      (vehicles && vehicles.length > 1) ||
      (filteredVehicles && filteredVehicles.length > 1);

    setIsMoreThanOneVehicle(_isMoreThanOneVehicle);

    if (noOfRenders === 0) {
      setNoOfRenders(prevNumber => prevNumber + 1);
      return;
    }

    if (route.params?.id && route.params?.Plate) {
      console.log('TIENE PARAMS');
      setFilters({
        ...filters,
        vehicleId: route.params.id,
        vehiclePlate: route.params.Plate,
      });
      return;
    }
    if (vehicles && vehicles.length === 1) {
      console.log('TIENE VEHICLES');
      setFilters(prevFilters => {
        return {
          ...prevFilters,
          vehicleId: vehicles[0].id,
          vehiclePlate: vehicles[0].Plate,
        };
      });
      return;
    }
    if (filteredVehicles && filteredVehicles.length === 1) {
      console.log('TIENE FILETERED VEHICLES');
      setFilters(prevFilters => {
        return {
          ...prevFilters,
          vehicleId: filteredVehicles[0].id,
          vehiclePlate: vehicles[0].Plate,
        };
      });
      return;
    }
    if (_isMoreThanOneVehicle) {
      //console.log('ABRE EL MODAL');
      setIsModalVehiclesFilterVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredVehicles, vehicles, noOfRenders]);

  useEffect(() => {
    const retrieveJourneys = async filter => {
      const mockedJourneys = await getJourneys(filter);
      const journeyColors = randomColor({
        count: mockedJourneys.length,
        luminosity: 'dark',
      });
      let journeyPath = [];
      let retrievedJourneys = [];

      mockedJourneys.map(item => {
        setLoading(true);
        let journeyCoords = [];
        journeyPath = item.JourneyPathStr.split(',');
        //console.log(journeyPath);
        journeyPath.map(point => {
          const coords = point.split(' ');
          const lat = coords[1];
          const lon = coords[0];
          journeyCoords = [
            ...journeyCoords,
            {
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            },
          ];
        });
        //console.log('journey: ', journeyCoords);
        retrievedJourneys = [
          ...retrievedJourneys,
          {
            id: retrievedJourneys.length + 1,
            coords: journeyCoords,
            color: journeyColors[retrievedJourneys.length],
            start: item.JourneyStart,
            end: item.JourneyEnd,
            journeyEndMetersSinceIgnON: item.JourneyEndMetersSinceIgnON,
          },
        ];
      });
      //console.log(retrievedJourneys);
      console.log('recuperadas', retrievedJourneys.length, 'rutas');
      setLoading(false);
      return retrievedJourneys;
    };

    console.log('USEEFFECT FILTERS', filters);
    filters.vehicleId &&
      retrieveJourneys(filters)
        .then(data => {
          console.log(data);
          setJourneys(data);
        })
        .catch(error => {
          console.log('Error al recuperar rutas:', error);
        });
  }, [filters]);

  useEffect(() => {
    const setNavigationOptions = () => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderIconsContainer>
            <HeaderIconButton
              name={'palette'}
              onPress={() => {
                switchTheme();
              }}
            />
            <HeaderIconButton
              name={'logout'}
              onPress={() => {
                logout();
              }}
            />
          </HeaderIconsContainer>
        ),
      });
    };

    setNavigationOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, logout, switchTheme]);

  useEffect(() => {
    AsyncStorage.getItem('FILTERED_VEHICLES').then(data => {
      setFilteredVehicles(JSON.parse(data));
    });
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        startDate: getTodayStartDate(),
        endDate: getTodayEndDate(),
      };
    });
  }, []);

  return (
    <ScrollView>
      <Loading isVisible={loading} text="Recuperando rutas..." />
      <HeaderLogo />
      <FilterSelector
        filters={filters}
        setFilters={setFilters}
        setIsModalVehiclesFilterVisible={setIsModalVehiclesFilterVisible}
        changeVehicleEnabled={isMoreThanOneVehicle}
      />
      <FiltersView filters={filters} />
      <JourneysSelector journeys={journeys} />
      <View style={globalStyles.container}>
        <Modal isVisible={isModalVehiclesFilterVisible} backdropOpacity={0.2}>
          <ModalVehiclesFilter
            filters={filters}
            setFilters={setFilters}
            setIsModalVehiclesFilterVisible={setIsModalVehiclesFilterVisible}
          />
        </Modal>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 40.4716,
            longitude: -3.3762,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {journeys.map(polyline => {
            const lastCoord = polyline.coords.length - 1;
            return (
              <>
                <Marker
                  key={polyline.start}
                  coordinate={polyline.coords[0]}
                  image={startJourneyMarker}
                  centerOffset={{x: 0, y: 0}}>
                  <Callout tooltip>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>
                          {moment(polyline.start).format('DD/MM/YY HH:mm')}
                        </Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>
                </Marker>
                <Polyline
                  key={polyline.id}
                  coordinates={polyline.coords}
                  strokeColor={polyline.color}
                  strokeWidth={3}
                />
                <Marker
                  key={polyline.end}
                  coordinate={polyline.coords[lastCoord]}
                  image={endJourneyMarker}
                  centerOffset={{x: 0, y: 0}}>
                  <Callout key={polyline.end} tooltip>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>
                          {moment(polyline.end).format('DD/MM/YY HH:MM')}
                        </Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </MapView>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: '#fff',
    padding: 5,
    width: '100%',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 8,
    alignSelf: 'center',
    marginTop: 0,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  bubbleText: {
    fontSize: 16,
  },
});
