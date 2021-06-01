import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';

import Map from '../components/Map';
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';
import Loading from '../components/Loading';

export default function Realtime(props) {
  const {navigation} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const [username, setUsername] = useState('');
  const [route, setRoute] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentRegion, setCurrentRegion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    AsyncStorage.getItem('USER')
      .then(resultObjetc => {
        const parseUser = JSON.parse(resultObjetc);
        setUsername(parseUser.username.toUpperCase());
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <ScrollView>
      <Text>{`HELLO ${username} FROM REAL TIME`}</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
