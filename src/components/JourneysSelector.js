import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';

import ModalJourneysFilter from './ModalJourneysFilter';

export default function JourneysSelector(props) {
  const {
    journeys,
    checkedJourneys,
    setCheckedJourneys,
    isAllCheckedJourneys,
    setIsAllCheckedJourneys,
  } = props;
  const {colors} = useTheme();

  const [modalJourneysFilterVisible, setModalJourneysFilterVisible] =
    useState(false);
  const [totalDistance, setTotalDistance] = useState('');

  useEffect(() => {
    const calculateDistance = () => {
      let acc = 0;
      checkedJourneys.map(journey => {
        acc += journey.journeyEndMetersSinceIgnON;
        console.log(journey.journeyEndMetersSinceIgnON);
      });
      const km = acc / 1000;
      const meters = acc % 1000;
      setTotalDistance(`${km}Km - ${meters}m`);
    };

    calculateDistance();
  }, [checkedJourneys]);

  const handleOnPress = () => {
    journeys.length > 0 && setModalJourneysFilterVisible(true);
  };

  const renderInfo = () => {
    if (journeys.length === 0) {
      return (
        <Text style={[styles.filtersViewText, {color: colors.primary}]}>
          No hay rutas en esta fecha
        </Text>
      );
    }
    if (isAllCheckedJourneys) {
      return (
        <Text style={[styles.filtersViewText, {color: colors.primary}]}>
          {`Todas las rutas: ${totalDistance}`}
        </Text>
      );
    }
    if (checkedJourneys.length === 0 && journeys.length > 0) {
      return (
        <Text
          style={[
            styles.filtersViewText,
            {color: colors.primary, fontWeight: 'bold'},
          ]}>
          Ninguna ruta seleccionada
        </Text>
      );
    }
    if (checkedJourneys.length === 1) {
      return (
        <Text
          style={[
            styles.filtersViewText,
            {color: colors.primary},
          ]}>{`${checkedJourneys.length} ruta: ${totalDistance}`}</Text>
      );
    }
    if (checkedJourneys.length > 1) {
      return (
        <Text
          style={[
            styles.filtersViewText,
            {color: colors.primary},
          ]}>{`${checkedJourneys.length} rutas: ${totalDistance}`}</Text>
      );
    }
  };

  return (
    <View
      style={[
        styles.filtersViewContainer,
        {backgroundColor: colors.background, borderBottomColor: colors.border},
      ]}>
      <Pressable style={styles.filtersViewPressable} onPress={handleOnPress}>
        {renderInfo()}
      </Pressable>
      <Modal
        isVisible={modalJourneysFilterVisible}
        onBackdropPress={() => setModalJourneysFilterVisible(false)}>
        <ModalJourneysFilter
          journeys={journeys}
          checkedJourneys={checkedJourneys}
          setCheckedJourneys={setCheckedJourneys}
          isAllCheckedJourneys={isAllCheckedJourneys}
          setIsAllCheckedJourneys={setIsAllCheckedJourneys}
          setModalJourneysFilterVisible={setModalJourneysFilterVisible}
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
