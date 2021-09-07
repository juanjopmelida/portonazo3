import moment from 'moment';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import DateRangePicker from 'rn-select-date-range';
import {useTheme} from '@react-navigation/native';

const ModalDateRangePicker = () => {
  const {colors} = useTheme();
  const [selectedRange, setRange] = useState({});

  return (
    <View style={styles.container}>
      <DateRangePicker
        onSelectDateRange={range => {
          setRange(range);
        }}
        blockSingleDateSelection={false}
        responseFormat="DD-MM-YYYY"
        maxDate={moment()}
        minDate={moment().subtract(100, 'days')}
        selectedDateContainerStyle={[
          styles.selectedDateContainerStyle,
          {backgroundColor: colors.primary},
        ]}
        selectedDateStyle={styles.selectedDateStyle}
      />
      <View>
        <Text>first date: {selectedRange.firstDate}</Text>
        <Text>second date: {selectedRange.secondDate}</Text>
      </View>
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
