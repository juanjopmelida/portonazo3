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

export const getStoredFingerprint = async () => {
  try {
    const fingerprint = await AsyncStorage.getItem('FINGERPRINT');
    if (fingerprint) {
      console.log('Has stored fingerprint');
      return true;
    } else {
      console.log('Has not stored fingerprint');
    }
  } catch (error) {
    console.error('Error getting FINGERPRINT: ', error);
    return false;
  }
};

export const verifyFingerprint = async () => {
  let storedFingerprint = '',
    user = {},
    parseUser = {},
    payload = '';
  try {
    storedFingerprint = await AsyncStorage.getItem('FINGERPRINT');
    user = await AsyncStorage.getItem('USER');
    parseUser = JSON.parse(user);
    payload = parseUser.username + parseUser.password;
  } catch (error) {
    console.error('ERROR GETTING FINGERPRINT/USER FROM STORAGE: ', error);
  }

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
    .catch(error => console.error('createSignature', error));
};

export const createFingerprint = async () => {
  let user = {},
    parseUser = {},
    payload = '';

  try {
    user = await AsyncStorage.getItem('USER');
    parseUser = JSON.parse(user);
    payload = parseUser.username + parseUser.password;
    console.log(payload);
  } catch (error) {
    console.error('ERROR GETTING USER FROM STORAGE: ', error);
  }

  // CHAPUCILLA PARA QUE SALGA EL PROMPT DE HUELLA. ES UN ISSUE DE LA LIBRERÍA
  ReactNativeBiometrics.createKeys('Confirma huella').then(result => {
    const {publicKey} = result;
    console.log(publicKey);
  });
  // HASTA AQUÍ LA CHAPUCILLA

  return ReactNativeBiometrics.createSignature({
    promptMessage: 'Registrar huella',
    payload: payload,
  })
    .then(resultObject => {
      const {success, signature} = resultObject;

      if (success) {
        AsyncStorage.setItem('FINGERPRINT', signature);
        //console.log(signature);
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
        .catch(error => console.error('ERROR DELETING BIOMETRIC KEY', error));
      return true;
    })
    .catch(error => {
      console.error('ERROR REMOVING FINGERPRINT FROM STORAGE: ', error);
      return false;
    });
};
