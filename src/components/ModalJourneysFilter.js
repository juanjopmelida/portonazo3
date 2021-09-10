import React, {useEffect} from 'react';
import moment from 'moment';
import {CheckBox} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function ModalJourneysFilter(props) {
  const {journeys, selectedJourneys, setSelectedJourneys} = props;
  const {colors} = useTheme();

  const addItem = item => {
    const newList = selectedJourneys.concat(item);
    setSelectedJourneys(newList);
  };

  const removeItem = id => {
    const newList = selectedJourneys.filter(item => item.id !== id);
    newList.length === 0
      ? setSelectedJourneys(journeys)
      : setSelectedJourneys(newList);
  };

  const handleCheckAllJourneys = () => {
    if (journeys === selectedJourneys) {
      setSelectedJourneys([]);
    } else {
      setSelectedJourneys(journeys);
    }
  };

  const handleCheckJourney = journey => {
    if (selectedJourneys.includes(journey)) {
      removeItem(journey.id);
    } else {
      addItem(journey);
    }
  };

  const isSelected = id =>
    selectedJourneys.filter(item => item.id === id).length > 0;

  useEffect(() => {
    console.log('JOURNEYS', journeys);
    console.log('SELECTED JOURNEYS', selectedJourneys);
  }, [journeys, selectedJourneys]);

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
        checked={selectedJourneys === journeys}
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
            checked={isSelected(journey.id)}
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
