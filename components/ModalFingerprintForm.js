import React, {useState, useEffect} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalFingerprintForm() {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    retrieveUser();
  }, []);

  useEffect(() => {
    requestFingerprint();
  }, [payload]);

  const retrieveUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        const parseUser = JSON.parse(user);
        //setPayload(parseUser.username, parseUser.password);
      }
    } catch (e) {
      console.log(e);
    }
  };


  return <></>;
}
