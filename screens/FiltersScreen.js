import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

import globalStyles from '../styles/global';
import Loading from '../components/Loading';

export default function FiltersScreen(props) {
  const {navigation, route} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const {colors} = useTheme();
  const [username, setUsername] = useState(route.params.username);
  const [vehicles, setVehicles] = useState([]);
  const [realTimes, setRealTimes] = useState([]);
  const [realTimeDetails, setRealTimeDetails] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

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
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
    AsyncStorage.getItem('REAL_TIMES').then(data => {
      setRealTimes(JSON.parse(data));
    });
    AsyncStorage.getItem('REAL_TIME_DETAILS').then(data => {
      setRealTimeDetails(JSON.parse(data));
    });
    AsyncStorage.getItem('ADDRESSES').then(data => {
      setAddresses(JSON.parse(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, logout, switchTheme]);

  const handleFilter = e => {
    setFilter(e.nativeEvent.text);
  };

  return (
    <ScrollView>
      <Loading isVisible={loading} text="Localizando..." />
      <HeaderLogo />
      <View style={styles.container}>
        <View
          style={[
            styles.headerView,
            {
              backgroundColor: colors.backgroundGrey,
              borderColor: colors.border,
            },
          ]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Filtros</Text>
          <Button
            title="Guardar"
            type="clear"
            loading={loading}
            style={[styles.headerButton]}
            titleStyle={{color: colors.primary}}
          />
        </View>
        <View style={styles.searchView}>
          <Input
            containerStyle={styles.searchInputContainer}
            style={styles.searchInput}
            placeholder="Buscar..."
            leftIcon={
              <Icon
                size={20}
                name="magnify"
                color={colors.text}
                iconStyle={globalStyles.iconInput}
              />
            }
            value={filter}
            onChange={e => handleFilter(e)}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="TODOS"
            type="solid"
            containerStyle={[styles.containerButton]}
            titleStyle={[styles.titleButton]}
            buttonStyle={[styles.button]}
          />
          <Button
            title="NINGUNO"
            type="outline"
            containerStyle={
              ([styles.containerButton],
              {backgroundColor: colors.backgroundGrey})
            }
            titleStyle={[styles.titleButton, styles.noneButton]}
            buttonStyle={[styles.button]}
          />
        </View>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  headerText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  headerButton: {
    fontFamily: 'Montserrat',
  },
  searchView: {width: '100%', alignItems: 'center'},
  searchInput: {fontSize: 16},
  searchInputContainer: {
    width: '90%',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },

  button: {
    height: 30,
    width: 80,
  },
  containerButton: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  titleButton: {fontSize: 12},
  noneButton: {color: '#797979'},
});
