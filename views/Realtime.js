import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {openSignalRConnection} from '../signalr';

import {getLastPositions} from '../api';
import Map from '../components/Map';
import globalStyles from '../styles/global';
import Loading from '../components/Loading';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Realtime(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [vehicles, setVehicles] = useState([]);
  const [journey, setJourney] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentRegion, setCurrentRegion] = useState({});
  const [loading, setLoading] = useState(true);

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

  const setMap = () => {
    return getLastPositions(params)
      .then(response => {
        const {content, resultCode, resultMessage} = response;
        console.log(resultCode);

        if (resultCode === 1) {
          const {lastPositions} = content;
          const lastKeepAlive = lastPositions.findIndex(
            e => e.eventTypeId === 67,
          );
          let lastValidPosition;
          if (lastKeepAlive === -1) {
            lastValidPosition = lastPositions.length - 1;
          } else if (lastKeepAlive === 0) {
            lastValidPosition = 1;
          } else {
            lastValidPosition = lastKeepAlive;
          }

          const processedPositions = lastPositions.slice(0, lastValidPosition);
          const filteredPositions = processedPositions.filter(
            item => item.latitude !== 0,
          );

          const finallyJourney = filteredPositions.map(element => [
            element.latitude,
            element.longitude,
          ]);

          setJourney(finallyJourney);

          console.log(finallyJourney[0][0]);

          setCurrentRegion({
            latitude: finallyJourney[0][0],
            longitude: finallyJourney[0][1],
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          });

          setCurrentPosition({
            latitude: finallyJourney[0][0],
            longitude: finallyJourney[0][1],
          });

          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };

  const retreiveVehicles = async () => {
    try {
      const vehs = await AsyncStorage.getItem('VEHICLES');
      setVehicles(JSON.parse(vehs));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNavigationOptions();
    setTimeout(() => setLoading(false), 1500);
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
  }, [navigation, logout, switchTheme]);

  return (
    <ScrollView>
      <Loading isVisible={loading} text="Localizando..." />
      <HeaderLogo />
      <View style={styles.container}>
        <Map vehicles={vehicles} style={styles.map} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
