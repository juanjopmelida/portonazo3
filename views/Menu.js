import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

import ModalFingerprintForm from '../components/ModalFingerprintForm';
import globalStyles from '../styles/global';
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {Button} from 'react-native-elements/dist/buttons/Button';

export default function Menu(props) {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);
  const [username, setUsername] = useState(null);
  const [touch, setTouch] = useState(false);
  const [fingerprintModalVisible, setFingerprintModalVisible] = useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

  const isTouchEnabled = async () => {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === ReactNativeBiometrics.Biometrics)
        setTouch(true);
    });
  };

  const toogleModal = () => {
    setFingerprintModalVisible(!fingerprintModalVisible);
  };

  useEffect(() => {
    isTouchEnabled();
  }, []);

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

    AsyncStorage.getItem('username').then(username =>
      setUsername(JSON.parse(username).toUpperCase()),
    );
  }, [navigation, logout, switchTheme]);

  return (
    <>
      <HeaderLogo />
      <Overlay
        isVisible={fingerprintModalVisible}
        onBackdropPress={toogleModal}>
        <ModalFingerprintForm />
      </Overlay>
      <View style={globalStyles.container}>
        <View style={styles.menuContainer}>
          <Text style={{color: colors.primary}}>{`HELLO ${username}`}</Text>
          {touch && (
            <Button
              title="Habilitar huella dactilar"
              onPress={() => setFingerprintModalVisible(true)}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
