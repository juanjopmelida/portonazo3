import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import EnabledEyeImage from '../assets/buttons/EnabledEye.png';
import DisabledEyeImage from '../assets/buttons/DisabledEye.png';
import EnabledCalendar from '../assets/buttons/EnabledCalendar.png';

import {
  getTodayStartDate,
  getTodayEndDate,
  getYesterdayStartDate,
  getYesterdayEndDate,
} from '../utils';
import ModalDateRangePicker from './ModalDateRangePicker';

export default function FilterSelector(props) {
  const {
    filters,
    setFilters,
    setIsModalVehiclesFilterVisible,
    changeVehicleEnabled,
  } = props;

  const {colors} = useTheme();

  const [activeIndex, setActiveIndex] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setActiveIndex(3);
    setShowDatePicker(true);
  };

  const handleChangeVehicleFilter = () => {
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

  return (
    <View style={styles.filterSelectorView}>
      <Pressable
        style={[
          {
            backgroundColor: colors.background,
            borderColor: colors.borderInactive,
          },
          changeVehicleEnabled
            ? [styles.filterSelectorIcon]
            : [styles.filterSelectorIconDisabled],
        ]}
        onPress={handleChangeVehicleFilter}
        disabled={!changeVehicleEnabled}>
        <Image
          source={changeVehicleEnabled ? EnabledEyeImage : DisabledEyeImage}
          style={styles.imageButton}
        />
      </Pressable>
      <Pressable
        style={[
          {backgroundColor: colors.background},
          activeIndex === 1
            ? [
                styles.filterSelectorPressableActive,
                {borderColor: colors.borderActive},
              ]
            : [
                styles.filterSelectorPressable,
                {borderColor: colors.borderInactive},
              ],
        ]}
        onPress={handlePressToday}>
        <Text
          style={[styles.filterSelectorPressableText, {color: colors.primary}]}>
          HOY
        </Text>
      </Pressable>
      <Pressable
        style={[
          {backgroundColor: colors.background},
          activeIndex === 2
            ? [
                styles.filterSelectorPressableActive,
                {borderColor: colors.borderActive},
              ]
            : [
                styles.filterSelectorPressable,
                {borderColor: colors.borderInactive},
              ],
        ]}
        onPress={handlePressYesterday}>
        <Text
          style={[styles.filterSelectorPressableText, {color: colors.primary}]}>
          AYER
        </Text>
      </Pressable>
      <Pressable
        style={
          ({backgroundColor: colors.background},
          [
            activeIndex === 3
              ? [
                  styles.filterSelectorIconActive,
                  {borderColor: colors.borderActive},
                ]
              : [
                  styles.filterSelectorIcon,
                  {borderColor: colors.borderInactive},
                ],
          ])
        }
        onPress={openDatePicker}>
        <Image source={EnabledCalendar} style={styles.imageButton} />
      </Pressable>
      <Modal
        isVisible={showDatePicker}
        onBackdropPress={() => setShowDatePicker(false)}
        backdropOpacity={0.2}>
        <ModalDateRangePicker
          filters={filters}
          setFilters={setFilters}
          setShowDatePicker={setShowDatePicker}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSelectorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 30,
  },
  filterSelectorIcon: {
    height: '100%',
    width: '10%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorIconDisabled: {
    height: '100%',
    width: '10%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorIconActive: {
    height: '100%',
    width: '10%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorPressable: {
    height: '100%',
    width: '40%',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorPressableActive: {
    height: '100%',
    width: '40%',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelectorPressableDisabled: {
    height: '100%',
    width: '25%',
    borderWidth: 0.5,
    borderColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  filterSelectorPressableText: {
    fontSize: 12,
    color: '#0a0a0a',
  },
  imageButton: {width: 20, height: 20, resizeMode: 'stretch'},
});
