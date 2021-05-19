import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';

import globalStyles from '../styles/global';
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

export default function Menu(props) {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);
  const [username, setUsername] = useState(null);
  const toastRef = useRef();
  const {colors} = useTheme();

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

    AsyncStorage.getItem('username').then(username =>
      setUsername(username.toUpperCase()),
    );
  }, [navigation, logout, switchTheme]);

  return (
    <>
      <HeaderLogo />
      <View style={globalStyles.container}>
        <View style={styles.menuContainer}>
          <Text style={{color: colors.primary}}>
            {`HELLO ${username} FROM MENU`}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
