import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';

import ModalJourneysFilter from './ModalJourneysFilter';

export default function JourneysSelector(props) {
  const {journeys} = props;
  const {colors} = useTheme();

  const [modalJourneysFilterVisible, setModalJourneysFilterVisible] =
    useState(false);
  const [selectedJourneys, setselectedJourneys] = useState(journeys);
  const [totalDistance, setTotalDistance] = useState('');

  useEffect(() => {
    const calculateDistance = () => {
      let acc = 0;
      journeys.map(journey => {
        acc += journey.journeyEndMetersSinceIgnON;
        console.log(journey.journeyEndMetersSinceIgnON);
      });
      const km = acc / 1000;
      const meters = acc % 1000;
      setTotalDistance(`${km}Km - ${meters}m`);
    };

    calculateDistance();
  }, [journeys]);

  return (
    <View
      style={[
        styles.filtersViewContainer,
        {backgroundColor: colors.background, borderBottomColor: colors.border},
      ]}>
      <Pressable
        style={styles.filtersViewPressable}
        onPress={() => setModalJourneysFilterVisible(true)}>
        <Text style={[styles.filtersViewText, {color: colors.primary}]}>
          {selectedJourneys.length === 0 ||
          selectedJourneys.length === journeys.length
            ? `Todas las rutas: ${totalDistance}`
            : `${selectedJourneys.length} ruta seleccionada`}
        </Text>
      </Pressable>
      <Modal
        isVisible={modalJourneysFilterVisible}
        onBackdropPress={() => setModalJourneysFilterVisible(false)}>
        <ModalJourneysFilter
          selectedJourneys={selectedJourneys}
          setselectedJourneys={setselectedJourneys}
          setModalJourneysFilterVisible={setModalJourneysFilterVisible}
          journeys={journeys}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersViewContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  filtersViewText: {
    fontSize: 11,
  },
  filtersViewPressable: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
