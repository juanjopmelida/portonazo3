import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import Menu from '../views/Menu';
import Journeys from '../views/Journeys';
import Contact from '../views/Contact';
import Realtime from '../views/Realtime';

const MainStack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{width: 90, height: 50}}
      source={require('../assets/logoViasatTelematics.png')}
    />
  );
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
        component={Menu}
        options={{
          title: 'Menú',
        }}
      />
      <MainStack.Screen
        name="realTime"
        component={Realtime}
        options={{
          title: 'Tiempo Real',
        }}
      />
      <MainStack.Screen
        name="journeys"
        component={Journeys}
        options={{
          title: 'Trayectos',
        }}
      />
      <MainStack.Screen
        name="contact"
        component={Contact}
        options={{
          title: 'Contacto',
        }}
      />
    </MainStack.Navigator>
  );
}
