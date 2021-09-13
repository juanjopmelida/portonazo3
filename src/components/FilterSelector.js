import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';

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
        style={
          changeVehicleEnabled
            ? styles.filterSelectorIcon
            : styles.filterSelectorIconDisabled
        }
        onPress={handleChangeVehicleFilter}
        disabled={!changeVehicleEnabled}>
        <Image
          source={changeVehicleEnabled ? EnabledEyeImage : DisabledEyeImage}
          style={styles.imageButton}
        />
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
            ? styles.filterSelectorIconActive
            : styles.filterSelectorIcon
        }
        onPress={openDatePicker}>
        {/* <DatePicker
          isVisible={showDatePicker}
          mode={'single'}
          onCancel={onCancel}
          onConfirm={onConfirm}
        /> */}
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
    backgroundColor: '#f2f2f2',
    height: 30,
  },
  filterSelectorIcon: {
    height: '100%',
    width: '10%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  filterSelectorIconDisabled: {
    height: '100%',
    width: '10%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  filterSelectorIconActive: {
    height: '100%',
    width: '10%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2d2d2',
    borderBottomWidth: 1,
  },
  filterSelectorPressable: {
    height: '100%',
    width: '40%',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  filterSelectorPressableActive: {
    height: '100%',
    width: '40%',
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
