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
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {
  createFingerprint,
  isTouchAvailable,
  getStoredFingerprint2,
  removeFingerprint,
} from '../utils/authHelper';

export default function Menu(props) {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [fingerprintButtonVisible, setFingerprintButtonVisible] =
    useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

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

    AsyncStorage.getItem('USER')
      .then(resultObjetc => {
        const parseUser = JSON.parse(resultObjetc);
        setUser(user);
        setUsername(parseUser.username.toUpperCase());
      })
      .catch(error => console.log(error));

    isTouchAvailable().then(touchAvailable => {
      touchAvailable &&
        getStoredFingerprint2().then(storedFP =>
          setFingerprintButtonVisible(!storedFP),
        );
    });
  }, [navigation, logout, switchTheme]);

  const handleCreateFingerprint = () => {
    createFingerprint().then(result => {
      if (result) {
        toastRef.current.show('Huella dactilar habilitada');
        setFingerprintButtonVisible(false);
      }
    });
  };

  const handleRemoveFingerprint = () => {
    removeFingerprint().then(result => {
      console.log('BOORADA', result);
      if (result) {
        toastRef.current.show('Huella dactilar deshabilitada');
        setFingerprintButtonVisible(true);
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
          {fingerprintButtonVisible ? (
            <Button
              title="Habilitar huella dactilar"
              onPress={handleCreateFingerprint}
            />
          ) : (
            <Button
              title="Deshabilitar huella dactilar"
              onPress={handleRemoveFingerprint}
            />
          )}
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
});
