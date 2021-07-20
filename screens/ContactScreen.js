import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openComposer} from 'react-native-email-link';
import DeviceInfo from 'react-native-device-info';
import {version} from '../package.json';

import {
  REACT_APP_VIASAT_CONTACT_PHONE,
  REACT_APP_VIASAT_CONTACT_EMAIL,
} from '@env';
// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import globalStyles from '../styles/global';

export default function ContactScreen(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [loading, setLoading] = useState(true);
  const [emailBody, setEmailBody] = useState('');

  const setNavigationOptions = () => {
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
  };

  useEffect(() => {
    setNavigationOptions();
  }, [navigation, logout, switchTheme]);

  const phoneCall = () => {
    let phoneNumber = '';
    Platform.OS === 'android'
      ? (phoneNumber = `tel:${REACT_APP_VIASAT_CONTACT_PHONE}`)
      : (phoneNumber = `telprompt:${REACT_APP_VIASAT_CONTACT_PHONE}`);
    Linking.openURL(phoneNumber);
  };

  const sendEmail = async () => {
    const model = await DeviceInfo.getModel();
    const sysVersion = await DeviceInfo.getSystemVersion();

    return openComposer({
      to: REACT_APP_VIASAT_CONTACT_EMAIL,
      subject: 'Contacto APP Viasat Telematics - Reale',
      body: `Mensaje: ${emailBody} \n \n Plataforma: ${Platform.OS} \n \n Modelo: ${model} \n \n Versión del sistema: ${sysVersion} \n \n Versión de la APP: ${version}`,
    });
  };

  const onChange = e => {
    setEmailBody(e.nativeEvent.text);
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text
          style={[globalStyles.textTitle, globalStyles.textColorBlueViasat]}>
          CONTACTA CON NOSOTROS
        </Text>
        <View style={globalStyles.dividerLineContainer}>
          <View
            style={[
              globalStyles.dividerLine,
              {backgroundColor: colors.backgroundGrey},
            ]}
          />
        </View>
        <Text style={[globalStyles.text, {color: colors.text}]}>
          Teléfono:{' '}
          <Text style={[styles.boldText, colors.text]}>
            {REACT_APP_VIASAT_CONTACT_PHONE}
          </Text>
        </Text>
        <Button
          icon={<Icon name="phone" size={22} color="white" />}
          title="llamar"
          titleStyle={globalStyles.textButton}
          containerStyle={[globalStyles.buttonContainer, globalStyles.shadow]}
          buttonStyle={globalStyles.button}
          onPress={phoneCall}
        />
        <View style={globalStyles.dividerLineContainer}>
          <View
            style={[
              globalStyles.dividerLine,
              {backgroundColor: colors.backgroundGrey},
            ]}
          />
        </View>
        <Text style={[globalStyles.text, {color: colors.text}]}>
          Email:{' '}
          <Text style={[styles.boldText, colors.text]}>
            {REACT_APP_VIASAT_CONTACT_EMAIL}
          </Text>
        </Text>
        <Input
          containerStyle={{marginTop: 25, width: '90%'}}
          style={{height: 150}}
          placeholder="Escribe tu mensaje..."
          label="Mensaje para Viasat Telematics"
          leftIcon={
            <Icon
              size={22}
              name="email-outline"
              color={colors.text}
              iconStyle={globalStyles.iconInput}
            />
          }
          value={emailBody || ''}
          onChange={e => onChange(e)}
        />
        <Button
          icon={<Icon name="email" size={22} color="white" />}
          title="enviar"
          titleStyle={globalStyles.textButton}
          containerStyle={[globalStyles.buttonContainer, globalStyles.shadow]}
          buttonStyle={globalStyles.button}
          onPress={sendEmail}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
});
