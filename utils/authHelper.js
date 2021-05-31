import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';

export const isTouchAvailable = () => {
  return ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported');
      return true;
    } else {
      console.log('Biometrics not supported');
    }
    return false;
  });
};

export const getStoredFingerprint2 = async () => {
  const fingerprint = await AsyncStorage.getItem('FINGERPRINT');
  if (fingerprint) {
    console.log('Has stored fingerprint');
    return true;
  } else {
    console.log('Has not stored fingerprint');
  }
  return false;
};

export const verifyFingerprint = async () => {
  const storedFingerprint = await AsyncStorage.getItem('FINGERPRINT');
  const user = await AsyncStorage.getItem('USER');
  const parseUser = JSON.parse(user);
  const payload = parseUser.username + parseUser.password;
  return ReactNativeBiometrics.createSignature({
    promptMessage: 'Registrar huella',
    payload: payload,
  })
    .then(result => {
      const {success, signature} = result;

      if (success) {
        if (storedFingerprint === signature) {
          //console.log('HUELLAS COINCIDEN');
          return true;
        } else {
          //console.log('HUELLAS NO COINCIDEN');
        }
      }
      return false;
    })
    .catch(error => console.log(error));
};

export const createFingerprint = async () => {
  const user = await AsyncStorage.getItem('USER');
  const parseUser = JSON.parse(user);
  const payload = parseUser.username + parseUser.password;
  console.log(payload);
  ReactNativeBiometrics.createKeys('Confirma huella').then(result => {
    const {publicKey} = result;
    console.log(publicKey);
  });
  return ReactNativeBiometrics.createSignature({
    promptMessage: 'Registrar huella',
    payload: payload,
  })
    .then(resultObject => {
      const {success, signature} = resultObject;

      if (success) {
        AsyncStorage.setItem('FINGERPRINT', signature);
        console.log(signature);
        return true;
      }
    })
    .catch(error => console.log('ERROR GENERANDO FIRMA', error));
  return false;
};

export const removeFingerprint = () => {
  return AsyncStorage.removeItem('FINGERPRINT')
    .then(() => {
      //console.log('BORRADA ASYNCSTORAGE');
      ReactNativeBiometrics.deleteKeys()
        .then(result => {
          const {keysDeleted} = result;
          //console.log('BORRADA KEY', keysDeleted);
        })
        .catch(error => console.log('ERROR BORRANDO DE ASYNCSTORAGE', error));
      return true;
    })
    .catch(error => {
      console.log('NO SE HA PODIDO BORRAR ASYNCSTORAGE', error);
      return false;
    });
};
