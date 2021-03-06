import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalVehiclesFilter(props) {
  const {filters, setFilters, setIsModalVehiclesFilterVisible} = props;
  const {colors} = useTheme();

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
  }, []);

  const handleSelectVehicle = vehicle => {
    console.log(vehicle.id);
    setFilters({
      ...filters,
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.Plate,
    });
    setIsModalVehiclesFilterVisible(false);
  };

  return (
    <View
      style={[
        {backgroundColor: colors.mapStylesModalTitleBackgroundColor},
        styles.modalVehiclesFilterView,
      ]}>
      <View style={styles.modalVehiclesFilterTitleView}>
        <Text
          style={[
            {color: colors.mapStylesModalTitleFontColor},
            styles.modalVehiclesFilterTitleText,
          ]}>
          Elige vehículo
        </Text>
      </View>
      {vehicles.map((item, index) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => {
              handleSelectVehicle(item);
            }}
            style={[
              {
                backgroundColor:
                  item.id === filters.vehicleId ? '#DCDCDC' : '#FFF',
                borderBottomWidth: 1,
                borderBottomEndRadius: vehicles.length - 1 === index ? 5 : 0,
                borderBottomStartRadius: vehicles.length - 1 === index ? 5 : 0,
              },
              styles.modalVehiclesFilterPressableView,
            ]}>
            <Text>{item.Plate}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  modalVehiclesFilterView: {
    width: 180,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  modalVehiclesFilterTitleView: {
    width: '100%',
    height: 30,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  modalVehiclesFilterTitleText: {
    fontFamily: 'Montserrat',
  },
  modalVehiclesFilterContentView: {
    width: '100%',
    height: '100%',
    borderTopColor: '#9b9b9b',
  },
  modalVehiclesFilterPressableView: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#cacaca',
  },
  modalVehiclesFilterPressableText: {
    fontFamily: 'Montserrat',
  },
});
