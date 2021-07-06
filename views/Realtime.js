import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {openSignalRConnection} from '../signalr';

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
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setNavigationOptions();
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, logout, switchTheme]);

  return (
    <ScrollView>
      <Loading isVisible={loading} text="Localizando..." />
      <HeaderLogo />
      <View style={styles.container}>
        <Map markers={vehicles} style={styles.map} />
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
