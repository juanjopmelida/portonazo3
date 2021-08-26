import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import randomColor from 'randomcolor';

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
import Map from '../components/Map';
import Loading from '../components/Loading';
import {getMockedJourneys} from '../api';
import {ConsoleLogger} from '@microsoft/signalr/dist/esm/Utils';

export default function JourneysScreen(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const mapRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [journeys, setJourneys] = useState([]);

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

  const getJourneys = async () => {
    const mockedJourneys = await getMockedJourneys();
    const journeyColors = randomColor({
      count: mockedJourneys.length,
      luminosity: 'dark',
    });
    let journeyPath = [];
    let retrievedJourneys = [];

    mockedJourneys.map(item => {
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
        },
      ];
    });
    //console.log(retrievedJourneys);
    console.log('recuperadas', retrievedJourneys.length, 'rutas');
    return retrievedJourneys;
  };

  useEffect(() => {
    setNavigationOptions();
    getJourneys()
      .then(data => {
        //console.log(data);
        setJourneys(data);
      })
      .catch(error => {
        console.log('Error al recuperar rutas:', error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, logout, switchTheme]);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <HeaderLogo />
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude:
              journeys.length > 0 ? journeys[0].coords[0].latitude : 40.4716,
            longitude:
              journeys.length > 0 ? journeys[0].coords[0].longitude : -3.3762,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {journeys.map(polyline => {
            const numberOfCoords = polyline.coords.length - 1;
            console.log(
              'journey:',
              polyline.id,
              'color:',
              polyline.color,
              'coords:',
              numberOfCoords,
            );
            return (
              <>
                <Marker
                  key={`startJourney${polyline.id}`}
                  coordinate={polyline.coords[0]}
                  image={startJourneyMarker}
                  anchor={{x: 0.69, y: 1}}
                />
                <Polyline
                  key={polyline.id}
                  coordinates={polyline.coords}
                  strokeColor={polyline.color}
                  strokeWidth={3}
                />
                <Marker
                  key={`endJourney${polyline.id}`}
                  coordinate={polyline.coords[numberOfCoords]}
                  image={endJourneyMarker}
                  centerOffset={{x: -2, y: -9}}
                />
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
  },
});
