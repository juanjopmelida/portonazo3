import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';

import globalStyles from '../styles/global';
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import MenuButtonsContainer from '../components/MenuButtonsContainer';
import MenuButton from '../components/MenuButton';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {
  createFingerprint,
  isTouchAvailable,
  getStoredFingerprint,
  removeFingerprint,
} from '../utils/authHelper';

export default function Menu(props) {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [fingerprintSupported, setFingerprintSupported] = useState(false);
  const [enableFingerprint, setEnableFingerprint] = useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

  const getUserStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('USER');
      const parseUser = JSON.parse(resultObjetc);
      setUser(user);
      setUsername(parseUser.username.toUpperCase());
    } catch (error) {
      error => console.log(error);
    }
  };

  useEffect(() => {
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

    getUserStorage();

    isTouchAvailable().then(touchAvailable => {
      setFingerprintSupported(touchAvailable);
      touchAvailable &&
        getStoredFingerprint().then(storedFP => {
          setEnableFingerprint(!storedFP);
        });
    });
  }, [navigation, logout, switchTheme]);

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
      //console.log('BOORADA', result);
      if (result) {
        toastRef.current.show('Huella dactilar deshabilitada');
        setEnableFingerprint(true);
      }
    });
  };

  return (
    <>
      <HeaderLogo />
      <View style={globalStyles.container}>
        <View style={styles.menuContainer}>
          <Text
            style={{
              color: colors.primary,
            }}>{`HELLO ${username}`}</Text>
          <MenuButtonsContainer>
            <MenuButton
              iconType="material"
              iconName="timer"
              title="Tiempo Real"
              style={styles.button}
              onPress={() => navigation.navigate('realTime')}
            />
            <MenuButton
              iconType="material-community"
              iconName="map-marker-path"
              title="Rutas"
              style={styles.button}
              onPress={() => navigation.navigate('journeys')}
            />
            <MenuButton
              iconType="material"
              iconName="timer"
              title="Contact"
              style={styles.button}
              onPress={() => navigation.navigate('contact')}
            />
          </MenuButtonsContainer>
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
