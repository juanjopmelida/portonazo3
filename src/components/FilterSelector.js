import React from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';

import {
  getTodayStartDate,
  getTodayEndDate,
  getYesterdayStartDate,
  getYesterdayEndDate,
} from '../utils';

export default function FilterSelector(props) {
  const {filters, setFilters, setIsModalVehiclesFilterVisible} = props;

  const handlePressYesterday = () => {
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        startDate: getYesterdayStartDate(),
        endDate: getYesterdayEndDate(),
      };
    });
  };

  const handlePressToday = () => {
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        startDate: getTodayStartDate(),
        endDate: getTodayEndDate(),
      };
    });
  };

  const handleChangeVehicleFilter = () => {
    setIsModalVehiclesFilterVisible(true);
  };

  return (
    <View style={styles.filterSelectorView}>
      <Pressable
        style={styles.filterSelectorPressable}
        onPress={handleChangeVehicleFilter}>
        <Text style={styles.filterSelectorPressableText}>CAMBIAR VEH</Text>
      </Pressable>
      <Pressable
        style={styles.filterSelectorPressable}
        onPress={handlePressToday}>
        <Text style={styles.filterSelectorPressableText}>HOY</Text>
      </Pressable>
      <Pressable
        style={styles.filterSelectorPressable}
        onPress={handlePressYesterday}>
        <Text style={styles.filterSelectorPressableText}>AYER</Text>
      </Pressable>
      <Pressable style={styles.filterSelectorPressable}>
        <Text style={styles.filterSelectorPressableText}>CALENDARIO</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSelectorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f2f2f2',
    height: 40,
  },
  filterSelectorPressable: {
    height: '100%',
    width: '25%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorPressableText: {
    fontSize: 12,
    color: '#0a0a0a',
  },
});
