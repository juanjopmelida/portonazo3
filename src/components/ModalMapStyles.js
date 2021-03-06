import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {MAP_TYPES} from 'react-native-maps';

const ModalMapStyles = ({mapType, setMapType}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {backgroundColor: colors.mapStylesModalTitleBackgroundColor},
        styles.modalMapTypesView,
      ]}>
      <View style={styles.modalMapTypesTitleView}>
        <Text
          style={[
            {color: colors.mapStylesModalTitleFontColor},
            styles.modalMapTypesTitleText,
          ]}>
          Tipo de mapa
        </Text>
      </View>
      <View
        style={[
          {borderBottomColor: colors.mapStylesModalViewBorderColor},
          styles.modalMapTypesContentView,
        ]}>
        <Pressable
          onPress={() => setMapType(MAP_TYPES.STANDARD)}
          style={[
            {
              backgroundColor:
                mapType === MAP_TYPES.STANDARD ? '#DCDCDC' : '#FFF',
              borderBottomColor: colors.mapStylesModalViewBorderColor,
            },
            styles.modalMapTypesPressableView,
          ]}>
          <Text
            style={[
              {
                color: colors.mapStylesModalViewFontColor,
              },
              styles.modalMapTypesPressableText,
            ]}>
            Estándar
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setMapType(MAP_TYPES.HYBRID)}
          style={[
            {
              backgroundColor:
                mapType === MAP_TYPES.HYBRID ? '#DCDCDC' : '#FFF',
              borderBottomColor: colors.mapStylesModalViewBorderColor,
            },
            styles.modalMapTypesPressableView,
          ]}>
          <Text
            style={[
              {color: colors.mapStylesModalViewFontColor},
              styles.modalMapTypesPressableText,
            ]}>
            Híbrido
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setMapType(MAP_TYPES.SATELLITE)}
          style={[
            {
              backgroundColor:
                mapType === MAP_TYPES.SATELLITE ? '#DCDCDC' : '#FFF',
              borderBottomWidth: 0,
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
            },
            styles.modalMapTypesPressableView,
          ]}>
          <Text
            style={[
              {color: colors.mapStylesModalViewFontColor},
              styles.modalMapTypesPressableText,
            ]}>
            Satélite
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalMapStyles;

const styles = StyleSheet.create({
  modalMapTypesView: {
    width: 180,
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  modalMapTypesTitleView: {
    width: '100%',
    height: '20%',
    paddingLeft: 15,
    justifyContent: 'center',
  },
  modalMapTypesTitleText: {
    fontFamily: 'Montserrat',
  },
  modalMapTypesContentView: {
    width: '100%',
    height: '100%',
    borderTopWidth: 0.8,
    borderTopColor: '#9b9b9b',
  },
  modalMapTypesPressableView: {
    height: '26.6%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#cacaca',
    borderBottomWidth: 0.8,
  },
  modalMapTypesPressableText: {
    fontFamily: 'Montserrat',
  },
});
