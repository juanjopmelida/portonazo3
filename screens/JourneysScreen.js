import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import MapView, {Polyline} from 'react-native-maps';

// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

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
    let journeyPath = [];
    let journeyCoords = [];
    let retrievedJourneys = [];
    mockedJourneys.map(item => {
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
        },
      ];
    });
    return retrievedJourneys;
  };

  useEffect(() => {
    setNavigationOptions();
    getJourneys().then(data => {
      //data.map(item => console.log(item.coords));
      setJourneys(data);
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
            latitude: 40.4769,
            longitude: -3.38415,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {journeys.length > 0
            ? journeys.map(journey => {
                <Polyline
                  key={journey.id}
                  coordinates={journey.coords}
                  strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000',
                  ]}
                  strokeWidth={6}
                />;
              })
            : console.log('No hay rutas')}
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
