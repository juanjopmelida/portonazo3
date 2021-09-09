import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function FiltersView(props) {
  const {filters} = props;
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.filtersViewContainer,
        {backgroundColor: colors.background, borderColor: colors.border},
      ]}>
      <Text style={[styles.filtersViewText, {color: colors.primary}]}>
        {`${filters.vehiclePlate} | ${moment(filters.startDate).format(
          'DD/MM/YYYY',
        )} - ${moment(filters.endDate).format('DD/MM/YYYY')}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersViewContainer: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cacaca',
  },
  filtersViewText: {
    fontSize: 11,
  },
});
