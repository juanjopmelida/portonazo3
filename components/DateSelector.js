import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default function DateSelector() {
  return (
    <View style={styles.dateSelectorContainer}>
      <Text>SELECCIONA UNA FECHA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateSelectorContainer: {
    borderWidth: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: 20,
  },
});
