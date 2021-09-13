import React, {useEffect} from 'react';
import moment from 'moment';
import {CheckBox} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

//https://codesandbox.io/s/react-select-all-checkbox-jbub2?file=/src/Checkbox.js
//https://stackoverflow.com/questions/60918164/select-all-the-checkbox-group-react-native

export default function ModalJourneysFilter(props) {
  const {
    journeys,
    checkedJourneys,
    setCheckedJourneys,
    isAllCheckedJourneys,
    setIsAllCheckedJourneys,
  } = props;
  const {colors} = useTheme();

  const handleCheckAllJourneys = e => {
    setIsAllCheckedJourneys(!isAllCheckedJourneys);
    isAllCheckedJourneys
      ? setCheckedJourneys([])
      : setCheckedJourneys(journeys);
  };

  const handleCheckJourney = journey => {
    if (checkedJourneys.includes(journey)) {
      setCheckedJourneys(
        checkedJourneys.filter(item => item.id !== journey.id),
      );
      setIsAllCheckedJourneys(false);
      return;
    }
    setCheckedJourneys([...checkedJourneys, journey]);
  };

  useEffect(() => {
    journeys.length === checkedJourneys.length && setIsAllCheckedJourneys(true);
  }, [journeys, checkedJourneys, setIsAllCheckedJourneys]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <CheckBox
        title={'Todas las rutas'}
        containerStyle={[
          styles.checkBoxContainer,
          {backgroundColor: colors.background},
        ]}
        textStyle={[styles.checkBoxText, {color: colors.text}]}
        onPress={handleCheckAllJourneys}
        checked={isAllCheckedJourneys}
        checkedColor="#446070"
      />
      {journeys.map(journey => {
        return (
          <CheckBox
            key={journey.id}
            title={`${moment(journey.start).format(
              'DD/MM/YYYY HH:mm',
            )} - ${moment(journey.end).format('DD/MM/YYYY HH:mm')}`}
            containerStyle={[
              styles.checkBoxContainer,
              {backgroundColor: colors.background},
            ]}
            textStyle={[styles.checkBoxText, {color: colors.text}]}
            onPress={() => handleCheckJourney(journey)}
            checked={checkedJourneys.includes(journey)}
            checkedColor={colors.primary}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  checkBoxContainer: {
    height: 45,
    borderWidth: 0,
  },
  checkBoxText: {
    fontSize: 12,
  },
});
