import React, {useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';

import globalStyles from '../styles/global';
import {AuthContext} from '../contexts/AuthContext';
import Loading from '../components/Loading';
import Header from '../components/Header';

export default function Login() {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState(defaultFormValue());
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();
  const {colors} = useTheme();

  function defaultFormValue() {
    return {username: '', password: ''};
  }

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <Header />
      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/LogoReale.png')}
          resizeMode="contain"
          style={styles.logoReale}
        />
        <Card style={styles.loginCard}>
          <View style={styles.iconContainer}>
            <Input
              placeholder="Usuario"
              onChange={e => onChange(e, 'username')}
              autoCapitalize="none"
              leftIcon={
                <Icon
                  type="material-community"
                  size={22}
                  name="account"
                  iconStyle={styles.iconRight}
                />
              }
              leftIconContainerStyle={styles.iconStyle}
            />
          </View>
          <View style={styles.iconContainer}>
            <Input
              placeholder="Contraseña"
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
                await login(formData);
              } catch (e) {
                toastRef.current.show(e.message);
                setLoading(false);
              }
            }}
          />
          <Loading isVisible={loading} text="Iniciando sesión" />
        </Card>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    height: '80%',
  },
  loginView: {},
  loginCard: {
    paddingBottom: 10,
  },
  iconContainer: {
    marginBottom: 15,
    width: '100%',
  },
  iconStyle: {
    marginRight: 10,
  },
  logoReale: {
    alignSelf: 'center',
  },
});
