import React from 'react';
import moment from 'moment';
import {CheckBox} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function ModalJourneysFilter(props) {
  const {
    journeys,
    selectedJourneys,
    setselectedJourneys,
    setModalJourneysFilterVisible,
  } = props;
  const {colors} = useTheme();

  const handleCheckAllJourneys = () => {
    setselectedJourneys(journeys);
    setModalJourneysFilterVisible(false);
  };

  const handleCheckJourney = journeyId => {
    !selectedJourneys.find(journey => journey.id === journeyId) &&
      setselectedJourneys([...selectedJourneys, journey]);
  };

  const isSelected = journeyId =>
    selectedJourneys.find(journey => journey.id === journeyId);

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
        checked={selectedJourneys.length === journeys.length}
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
            onPress={() => handleCheckJourney(journey.id)}
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
