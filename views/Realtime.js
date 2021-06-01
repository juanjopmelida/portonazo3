import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';

// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import globalStyles from '../styles/global';
import Map from '../components/Map';
import Loading from '../components/Loading';

export default function Realtime(props) {
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
    //retrieveUserFromStorage();
  }, [navigation, logout, switchTheme]);

  return (
    <ScrollView>
      <HeaderLogo />
      <Text>{`HELLO ${username} FROM REAL TIME`}</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
