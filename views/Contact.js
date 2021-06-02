import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {REACT_APP_VIASAT_CONTACT_PHONE} from '@env';
// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import globalStyles from '../styles/global';
import Map from '../components/Map';
import Loading from '../components/Loading';

export default function Contact(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentRegion, setCurrentRegion] = useState({});
  const [loading, setLoading] = useState(true);

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

    Platform.OS
      ? (phoneNumber = `tel:${REACT_APP_VIASAT_CONTACT_PHONE}`)
      : (phoneNumber = `telprompt:${REACT_APP_VIASAT_CONTACT_PHONE}`);

    Linking.openURL(phoneNumber);
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={[globalStyles.textTile, globalStyles.textColorBlueViasat]}>
          CONTACTA CON NOSOTROS
        </Text>
        <Text style={[globalStyles.text]}>
          Teléfono de contacto:{' '}
          <Text style={styles.boldText}>{REACT_APP_VIASAT_CONTACT_PHONE}</Text>
        </Text>
        <Button
          icon={<Icon name="phone" size={22} color="white" />}
          title="llamar"
          titleStyle={globalStyles.textButton}
          containerStyle={[globalStyles.buttonContainer, globalStyles.shadow]}
          buttonStyle={globalStyles.button}
          onPress={phoneCall}
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
