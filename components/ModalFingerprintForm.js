import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';

import Loading from '../components/Loading';

export default function ModalFingerprintForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const enableFingerprint = async () => {
    await Keychain.setGenericPassword('almighty', 'Detector@2020');
    ReactNativeBiometrics.createKeys('Confirme huella').then(resultObject => {
      const {publicKey} = resultObject;
      console.log(publicKey);
    });
  };

  return (
    <View>
      <Button title="Guardar huella" onPress={enableFingerprint} />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  );
}

const styles = StyleSheet.create({});
