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
  const [coords, setCoords] = useState([]);
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
    getMockedJourneys().then(mockedJourneys => {
      let journeyPath = [];
      const points = mockedJourneys.map(item => {
        journeyPath = item.JourneyPathStr.split(',');
        setJourneys([
          ...journeys,
          {
            id: journeys.length,
            coords: journeyPath.map(point => {
              const formattedPoint = point.split(' ');
              return {
                latitude: parseFloat(formattedPoint[0]),
                longitude: parseFloat(formattedPoint[1]),
              };
            }),
          },
        ]);
        console.log('JP: ', journeys);
      });
      // const _points = mockedJourneys.map(item => {
      //   const journeyPath = item.JourneyPathStr.split(',');
      //   const arrCoords = journeyPath.map(_route => {
      //     return _route.split(' ');
      //   });
      //   setCoords([...coords, arrCoords]);
      //   const journeyCoords = arrCoords.map(coord => {
      //     return {
      //       latitude: parseFloat(coord[0]),
      //       longitude: parseFloat(coord[1]),
      //     };
      //   });
      //   setJourneys([
      //     ...journeys,
      //     {
      //       id: journeys.length,
      //       coords: journeyCoords,
      //     },
      //   ]);
      // });
    });
  };

  useEffect(() => {
    setNavigationOptions();
    getJourneys();

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
          {journeys.map(polyline => (
            <Polyline
              key={polyline.id}
              coordinates={polyline.coords}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
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
