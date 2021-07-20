import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Image source={require('../assets/logoViasatTelematicsW250.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
