import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import LockedEngineImage from '../assets/buttons/LockedEngine.png';
import JourneysImage from '../assets/buttons/Journeys.png';
import GoToImage from '../assets/buttons/GoTo.png';

export default function RealtimeInfoTableButtonPad(props) {
  const {selectedMarker, setLockStatus, navigate} = props;

  const {colors} = useTheme();
  const NUMBER_OF_BUTTONS = 3;
  const SCREEN_WIDTH = Dimensions.get('window').width;

  return (
    <View style={styles.RealtimeInfoTableButtonPadContainerView}>
      <Pressable
        style={[
          styles.button,
          {
            width: SCREEN_WIDTH / NUMBER_OF_BUTTONS,
            backgroundColor: colors.modalButtonContent,
          },
        ]}
        onPress={setLockStatus}>
        <Image style={styles.imageButton} source={LockedEngineImage} />
        <Text style={[styles.textButton, {color: colors.modalButtonText}]}>
          Bloqueo Motor
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          {
            width: SCREEN_WIDTH / NUMBER_OF_BUTTONS,
            backgroundColor: colors.modalButtonContent,
          },
        ]}
        onPress={() => navigate('journeys', selectedMarker)}>
        <Image style={styles.imageButton} source={JourneysImage} />
        <Text style={[styles.textButton, {color: colors.modalButtonText}]}>
          Rutas
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          {
            width: SCREEN_WIDTH / NUMBER_OF_BUTTONS,
            backgroundColor: colors.modalButtonContent,
          },
        ]}
        onPress={() => navigate('journeys', selectedMarker)}>
        <Image style={styles.imageButton} source={GoToImage} />
        <Text style={[styles.textButton, {color: colors.modalButtonText}]}>
          Ir a...
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  RealtimeInfoTableButtonPadContainerView: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  button: {
    bottom: 0,
    height: '110%',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {fontSize: 10},
  imageButton: {width: 20, height: 20, resizeMode: 'stretch'},
});
