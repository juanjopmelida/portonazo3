import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FiltersView(props) {
  const {filters} = props;
  return (
    <View style={styles.filtersViewContainer}>
      <View>
        <Text>{filters.vehiclePlate}</Text>
      </View>
      <View>
        <Text>{moment(filters.startDate).format('DD/MM/YY HH:mm')}</Text>
      </View>
      <View>
        <Text>{moment(filters.endDate).format('DD/MM/YY HH:mm')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersViewContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
