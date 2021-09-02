import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/LogoReale.png')}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
  },
});
