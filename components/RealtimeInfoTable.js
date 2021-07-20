import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import ListItem from './ListItem';

export default function RealtimeInfoTable({
  selectedAddress,
  selectedRealTimeDetails,
}) {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.bodyRowView}>
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
        <ListItem
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
    </>
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
    shadowOpacity: 0.5,
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
