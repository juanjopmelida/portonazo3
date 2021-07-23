import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import MenuScreen from '../screens/MenuScreen';
import JourneysScreen from '../screens/JourneysScreen';
import ContactScreen from '../screens/ContactScreen';
import RealtimeScreen from '../screens/RealtimeScreen';
import FiltersScreen from '../screens/FiltersScreen';

const MainStack = createStackNavigator();

const LogoTitle = () => {
  return <Image source={require('../assets/logoViasatTelematicsW90.png')} />;
};

export function MainStackNavigator() {
  const {colors} = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName="Menu"
      headerMode="float"
      screenOptions={{
        headerStyle: {height: 110},
        headerTitleStyle: {color: colors.primary},
        headerTitleAlign: 'center',
        headerTitle: props => <LogoTitle {...props} />,
      }}>
      <MainStack.Screen
        name="menu"
        component={MenuScreen}
        options={{
          title: 'Menú',
        }}
      />
      <MainStack.Screen
        name="realTime"
        component={RealtimeScreen}
        options={{
          title: 'Tiempo Real',
        }}
      />
      <MainStack.Screen
        name="journeys"
        component={JourneysScreen}
        options={{
          title: 'Trayectos',
        }}
      />
      <MainStack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          title: 'Contacto',
        }}
      />
      <MainStack.Screen
        name="filters"
        component={FiltersScreen}
        options={{
          title: 'Filtros',
        }}
      />
    </MainStack.Navigator>
  );
}
