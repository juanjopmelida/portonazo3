import React, {useContext, useState, useRef, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';

import globalStyles from '../styles/global';
import {AuthContext} from '../contexts/AuthContext';
import Loading from '../components/Loading';
import HeaderLogo from '../components/HeaderLogo';
import {
  isTouchAvailable,
  getStoredFingerprint,
  verifyFingerprint,
} from '../helpers/authHelper';

export default function LoginScreen() {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState(defaultFormValue());
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fingerprintButtonVisible, setFingerprintButtonVisible] =
    useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

  function defaultFormValue() {
    return {username: '', password: ''};
  }

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const retreiveFormData = async () => {
    try {
      const user = await AsyncStorage.getItem('USER');

      if (user) {
        const parseUser = JSON.parse(user);

        setFormData({
          username: parseUser.username,
          password: parseUser.password,
        });
        setRememberMe(true);
      }
    } catch (e) {
      console.error('retreiveFormData: ', e);
    }
  };

  const handleButton = () => {
    verifyFingerprint().then(result => {
      if (result) {
        try {
          login(formData, rememberMe);
        } catch (error) {
          toastRef.current.show(error);
        }
      } else {
        toastRef.current.show('Las huellas no coinciden');
      }
    });
  };

  useEffect(() => {
    retreiveFormData();
    isTouchAvailable()
      .then(touchAvailable => {
        touchAvailable &&
          getStoredFingerprint().then(storedFP =>
            setFingerprintButtonVisible(storedFP),
          );
      })
      .catch(e => console.error('isTouchAvailable', JSON.stringify(e)));
  }, []);

  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <HeaderLogo />
      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/logoViasatTelematicsW250.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <Card style={styles.loginCard}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Usuario"
              underlineColorAndroid="transparent"
              value={formData.username || ''}
              onChange={e => onChange(e, 'username')}
              autoCapitalize="none"
              leftIcon={
                <Icon
                  size={22}
                  name="account-outline"
                  iconStyle={globalStyles.iconInput}
                  color={
                    formData.username && formData.username === ''
                      ? 'red'
                      : 'grey'
                  }
                />
              }
              leftIconContainerStyle={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Contraseña"
              underlineColorAndroid="transparent"
              value={formData.password || ''}
              onChange={e => onChange(e, 'password')}
              password={true}
              secureTextEntry={showPassword ? false : true}
              leftIcon={
                <Icon
                  type="material-community"
                  size={22}
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  iconStyle={globalStyles.iconInput}
                  onPress={() => setShowPassword(!showPassword)}
                  color={
                    formData.password && formData.password === ''
                      ? 'red'
                      : 'grey'
                  }
                />
              }
              leftIconContainerStyle={styles.icon}
            />
          </View>
          <Button
            title="Iniciar sesión"
            buttonStyle={globalStyles.button}
            titleStyle={globalStyles.textButton}
            containerStyle={styles.buttonContainer}
            onPress={async () => {
              try {
                setLoading(true);
                await login(formData, rememberMe);
              } catch (e) {
                toastRef.current.show(e.message);
                setLoading(false);
              }
            }}
          />
          <CheckBox
            title="Recordar credenciales"
            containerStyle={{
              borderColor: colors.borderInactive,
            }}
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            checkedColor={colors.primary}
          />
          {fingerprintButtonVisible && (
            <Button
              type="clear"
              title="Acceder con huella dactilar"
              onPress={handleButton}
            />
          )}
          <Loading isVisible={loading} text="Iniciando sesión" />
        </Card>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    width: '90%',
    height: '80%',
  },
  loginCard: {
    paddingBottom: 10,
  },
  inputContainer: {
    marginBottom: 5,
    width: '100%',
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});
