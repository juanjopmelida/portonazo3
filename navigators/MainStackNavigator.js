import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import Menu from '../views/Menu';
import Journeys from '../views/Journeys';
import Contact from '../views/Contact';
import Realtime from '../views/Realtime';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  const {colors} = useTheme();

  return (
    <MainStack.Navigator initialRouteName="Menu" headerMode="float">
      <MainStack.Screen
        name="menu"
        component={Menu}
        options={{
          title: 'Menú',
          headerTitleStyle: {color: colors.primary},
        }}
      />
      <MainStack.Screen
        name="realTime"
        component={Realtime}
        options={{
          title: 'Tiempo Real',
          headerTitleStyle: {color: colors.primary},
        }}
      />
      <MainStack.Screen
        name="journeys"
        component={Journeys}
        options={{
          title: 'Trayectos',
          headerTitleStyle: {color: colors.primary},
        }}
      />
      <MainStack.Screen
        name="contact"
        component={Contact}
        options={{
          title: 'Contacto',
          headerTitleStyle: {color: colors.primary},
        }}
      />
    </MainStack.Navigator>
  );
}
