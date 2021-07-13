import React, {useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import ListItemTitle from './ListItemTitle';

export default function RealTimeDetailModal(props) {
  const {
    handleClose,
    selectedMarker,
    selectedAddress,
    selectedRealTimeDetails,
  } = props;
  const colors = useTheme();
  const modalizeRef = useRef();

  return (
    <Modalize
      ref={modalizeRef}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      snapPoint={500}
      onClose={handleClose}
      HeaderComponent={
        <View style={styles.headerView}>
          <Text style={styles.modalText}>
            {`${selectedMarker.Brand} ${selectedMarker.Model}`}
          </Text>
        </View>
      }
      withHandle={false}>
      <View style={styles.bodyView}>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="Dirección"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedAddress.Address}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="F. posición"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedRealTimeDetails.PositionDate}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="Km total"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedRealTimeDetails.TotalKm}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="Km diario"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedRealTimeDetails.DailyKm}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="F. parada"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedRealTimeDetails.StopDate}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.bodyRowView}>
          <ListItemTitle
            title="T. inactivo"
            viewStyle={[
              styles.listItemView,
              styles.listItemTitleView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemTitleText,
              {
                color: colors.primary,
              },
            ]}
          />
          <ListItemTitle
            title={selectedRealTimeDetails.InactivePeriod}
            viewStyle={[
              styles.listItemView,
              {backgroundColor: colors.background},
            ]}
            textStyle={[
              styles.listItemInfoText,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}>
          <Pressable
            style={styles.button}
            onPress={() => navigate('journeys', user)}>
            <Icon
              type="material-community"
              name="crosshairs-gps"
              size={25}
              color={colors.menuButtonContent}
            />
            <Text style={[styles.text, {color: colors.menuButtonContent}]}>
              Tiempo Real
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigate('journeys', user)}>
            <Icon
              type="material-community"
              name="crosshairs-gps"
              size={25}
              color={colors.menuButtonContent}
            />
            <Text style={[styles.text, {color: colors.menuButtonContent}]}>
              Tiempo Real
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigate('journeys', user)}>
            <Icon
              type="material-community"
              name="crosshairs-gps"
              size={25}
              color={colors.menuButtonContent}
            />
            <Text style={[styles.text, {color: colors.menuButtonContent}]}>
              Tiempo Real
            </Text>
          </Pressable>
        </View>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
  },
  bodyRowView: {
    flexDirection: 'row',
    height: 30,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
  },
  listItemTitleView: {
    width: '30%',
    paddingLeft: 15,
  },
  listItemTitleText: {
    fontSize: 15,
  },
  listItemView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  listItemInfoText: {
    fontSize: 13,
  },
  modalText: {
    padding: 15,
    textAlign: 'center',
  },
});
