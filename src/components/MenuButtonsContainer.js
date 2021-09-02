import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function MenuButtonsContainer({children}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
