import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';

import EnabledEyeImage from '../assets/buttons/EnabledEye.png';

import {
  getTodayStartDate,
  getTodayEndDate,
  getYesterdayStartDate,
  getYesterdayEndDate,
} from '../utils';

export default function FilterSelector(props) {
  const {
    filters,
    setFilters,
    setIsModalVehiclesFilterVisible,
    changeVehicleEnabled,
  } = props;

  const [activeIndex, setActiveIndex] = useState(1);

  const handleChangeVehicleFilter = () => {
    setActiveIndex(0);
    setIsModalVehiclesFilterVisible(true);
  };

  const handlePressToday = () => {
    setActiveIndex(1);
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        startDate: getTodayStartDate(),
        endDate: getTodayEndDate(),
      };
    });
  };

  const handlePressYesterday = () => {
    setActiveIndex(2);
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        startDate: getYesterdayStartDate(),
        endDate: getYesterdayEndDate(),
      };
    });
  };

  const handlePressCalendar = () => {
    setActiveIndex(3);
  };

  return (
    <View style={styles.filterSelectorView}>
      <Pressable
        style={
          changeVehicleEnabled
            ? activeIndex === 0
              ? styles.filterSelectorPressableActive
              : styles.filterSelectorPressable
            : styles.filterSelectorPressableDisabled
        }
        onPress={handleChangeVehicleFilter}
        disabled={!changeVehicleEnabled}>
        <Image source="EnabledEyeImage" style={styles.imageButton} />
      </Pressable>
      <Pressable
        style={
          activeIndex === 1
            ? styles.filterSelectorPressableActive
            : styles.filterSelectorPressable
        }
        onPress={handlePressToday}>
        <Text style={styles.filterSelectorPressableText}>HOY</Text>
      </Pressable>
      <Pressable
        style={
          activeIndex === 2
            ? styles.filterSelectorPressableActive
            : styles.filterSelectorPressable
        }
        onPress={handlePressYesterday}>
        <Text style={styles.filterSelectorPressableText}>AYER</Text>
      </Pressable>
      <Pressable
        style={
          activeIndex === 3
            ? styles.filterSelectorPressableActive
            : styles.filterSelectorPressable
        }>
        <Text
          style={styles.filterSelectorPressableText}
          onPress={handlePressCalendar}>
          CALENDARIO
        </Text>
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
    backgroundColor: '#f2f2f2',
  },
  filterSelectorPressableActive: {
    height: '100%',
    width: '25%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2d2d2',
    borderBottomWidth: 1,
  },
  filterSelectorPressableDisabled: {
    height: '100%',
    width: '25%',
    borderWidth: 0.5,
    borderColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderBottomWidth: 1,
  },
  filterSelectorPressableText: {
    fontSize: 12,
    color: '#0a0a0a',
  },
  imageButton: {width: 20, height: 20, resizeMode: 'stretch'},
});
