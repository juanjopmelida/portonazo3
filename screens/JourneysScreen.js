import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import MapView, {Polyline, UrlTile} from 'react-native-maps';

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

export default function JourneysScreen(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [journeys, setJourneys] = useState([]);
  const [points, setPoints] = useState([]);
  const [coords, setCoords] = useState();

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

  const getJourneys = () => {
    getMockedJourneys().then(routes => {
      setJourneys(routes);
      console.log(routes[0].JourneyPathStr);
      setPoints(Polyline.decode(routes[0].JourneyPathStr));
      // setCoords(
      //   points.map((point, index) => {
      //     return {
      //       latitude: point[0],
      //       longitude: point[1],
      //     };
      //   }),
      // );
    });
  };

  useEffect(() => {
    setCoords(
      points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      }),
    );
  }, [points]);

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
          style={styles.map}
          initialRegion={{
            latitude: 40.4769,
            longitude: -3.38415,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Polyline coordinates={coords} strokeWidth={2} strokeColor="red" />
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
