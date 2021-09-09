import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';

// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import globalStyles from '../styles/global';
import MenuButtonsContainer from '../components/MenuButtonsContainer';
import MenuButton from '../components/MenuButton';

import {
  getVehiclesByFleet,
  getAllRealTimeByIds,
  getAllRealTimeDetailsByIds,
  getAllAddressByIds,
  getFleetById,
} from '../api';

import {
  createFingerprint,
  isTouchAvailable,
  getStoredFingerprint,
  removeFingerprint,
} from '../helpers/authHelper';

export default function MenuScreen(props) {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);
  const [user, setUser] = useState({});
  const [fingerprintSupported, setFingerprintSupported] = useState(false);
  const [enableFingerprint, setEnableFingerprint] = useState(false);
  const [noVehiclesAtFleet, setNoVehiclesAtFleet] = useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

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

  const manageFingerprint = () => {
    isTouchAvailable().then(touchAvailable => {
      setFingerprintSupported(touchAvailable);
      touchAvailable &&
        getStoredFingerprint().then(storedFP => {
          setEnableFingerprint(!storedFP);
        });
    });
  };

  const handleCreateFingerprint = () => {
    createFingerprint().then(result => {
      if (result) {
        toastRef.current.show('Huella dactilar habilitada');
        setEnableFingerprint(false);
      }
    });
  };

  const handleRemoveFingerprint = () => {
    removeFingerprint().then(result => {
      if (result) {
        toastRef.current.show('Huella dactilar deshabilitada');
        setEnableFingerprint(true);
      }
    });
  };

  useEffect(() => {
    const getAllDataByUser = () => {
      getVehiclesByFleet()
        .then(res => {
          console.log('getVehiclesByFleet: ', res);
          if (res && res.length > 0) {
            console.log('HAY VEHÍCULOS');
            const _vehicles = res.map(veh => {
              return veh.id;
            });
            getFleetById(res[0].FleetId);
            getAllRealTimeByIds(_vehicles);
            getAllRealTimeDetailsByIds(_vehicles);
            getAllAddressByIds(_vehicles);
          } else {
            setNoVehiclesAtFleet(true);
          }
        })
        .catch(error => {
          console.log('ERROR RECUPERANDO VEHÍCULOS:', error);
        });
    };

    retrieveUserFromStorage();
    manageFingerprint();
    getAllDataByUser();
  }, []);

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
  }, [navigation, logout, switchTheme]);

  return (
    <>
      <HeaderLogo />
      <View style={globalStyles.container}>
        <View style={styles.menuContainer}>
          <Text
            style={{
              color: colors.primary,
            }}>{`HOLA ${user.username}`}</Text>

          <MenuButtonsContainer>
            <MenuButton
              iconType="material-community"
              iconName="crosshairs-gps"
              title="Tiempo Real"
              style={styles.button}
              onPress={() => navigation.navigate('realTime', user)}
            />
            <MenuButton
              iconType="material-community"
              iconName="map-marker-path"
              title="Rutas"
              style={styles.button}
              onPress={() => navigation.navigate('journeys', user)}
            />
            <MenuButton
              iconType="material-community"
              iconName="account-question-outline"
              title="Contacto"
              style={styles.button}
              onPress={() => navigation.navigate('contact', user)}
            />
          </MenuButtonsContainer>
          {noVehiclesAtFleet && (
            <View style={{width: '100%', height: '100%', marginTop: 200}}>
              <Text>No se ha recuperado ningún vehículo para esta flota.</Text>
            </View>
          )}
          {fingerprintSupported &&
            (enableFingerprint ? (
              <Button
                type="clear"
                title="Habilitar huella dactilar"
                onPress={handleCreateFingerprint}
              />
            ) : (
              <Button
                type="clear"
                title="Deshabilitar huella dactilar"
                onPress={handleRemoveFingerprint}
              />
            ))}
        </View>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 115,
    height: 100,
    padding: 5,
    margin: 5,
    backgroundColor: '#585958',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
