import moment from 'moment';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import DateRangePicker from 'rn-select-date-range';
import {useTheme} from '@react-navigation/native';

const ModalDateRangePicker = props => {
  const {filters, setFilters, setShowDatePicker} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <DateRangePicker
        onSelectDateRange={range => {
          const _startDate = new Date(range.firstDate).setHours(0, 0, 0, 0);

          const _endDate = new Date(range.secondDate).setHours(23, 59, 59, 59);

          setFilters({
            ...filters,
            startDate: _startDate,
            endDate: _endDate,
          });
          console.log(filters);
          setShowDatePicker(false);
        }}
        blockSingleDateSelection={false}
        responseFormat="LLLL"
        maxDate={moment()}
        minDate={moment().subtract(100, 'days')}
        selectedDateContainerStyle={[
          styles.selectedDateContainerStyle,
          {backgroundColor: colors.primary},
        ]}
        selectedDateStyle={styles.selectedDateStyle}
      />
    </View>
  );
};

export default ModalDateRangePicker;

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: '45%',
    alignSelf: 'center',
    margin: 50,
    backgroundColor: '#fff',
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
