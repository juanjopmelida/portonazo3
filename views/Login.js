import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
} from 'react-native';
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import ReactNativeBiometrics from 'react-native-biometrics';

import globalStyles from '../styles/global';
import {AuthContext} from '../contexts/AuthContext';
import Loading from '../components/Loading';
import HeaderLogo from '../components/HeaderLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState(defaultFormValue());
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
  const [touch, setTouch] = useState(false);
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
      await AsyncStorage.getItem('user').then(user => {
        const parsedUser = JSON.parse(user);
        setFormData({
          username: parsedUser.username,
          password: parsedUser.password,
        });
      });
    } catch (e) {}
  };

  const isTouchAvailabe = async () => {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === ReactNativeBiometrics.Biometrics)
        setTouch(true);
    });
  };

  const fingerprint = () => {};

  useEffect(() => {
    retreiveFormData();
    isTouchAvailabe();
  }, []);

  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <HeaderLogo />
      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/LogoReale.png')}
          resizeMode="contain"
          style={styles.logoReale}
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
                  iconStyle={styles.iconRight}
                  color={
                    formData.username && formData.username === ''
                      ? 'red'
                      : 'grey'
                  }
                />
              }
              leftIconContainerStyle={styles.iconStyle}
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
                  iconStyle={styles.iconRight}
                  onPress={() => setShowPassword(!showPassword)}
                  color={
                    formData.password && formData.password === ''
                      ? 'red'
                      : 'grey'
                  }
                />
              }
              leftIconContainerStyle={styles.iconStyle}
            />
          </View>
          <Button
            title="Iniciar sesión"
            containerStyle={styles.btnContainerLogin}
            titleStyle={globalStyles.textButton}
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
              backgroundColor: colors.background,
              borderColor: colors.background,
            }}
            checked={rememberMe}
            onPress={() => setrememberMe(!rememberMe)}
          />
          {touch && (
            <Button title="Acceder con huella dactilar" onPress={fingerprint} />
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
  iconStyle: {
    marginRight: 10,
  },
  logoReale: {
    alignSelf: 'center',
  },
});
