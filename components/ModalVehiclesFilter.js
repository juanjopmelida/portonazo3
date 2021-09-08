import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalVehiclesFilter(props) {
  const {filters, setFilters} = props;
  const {colors} = useTheme();

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('VEHICLES').then(data => {
      setVehicles(JSON.parse(data));
    });
  }, []);

  const handleSelectVehicle = vehicle => {
    setFilters({
      ...filters,
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.Plate,
    });
    //console.log(vehicle.id);
  };

  return (
    <View
      style={[
        {backgroundColor: colors.mapStylesModalTitleBackgroundColor},
        styles.modalVehiclesFilterView,
      ]}>
      <View style={styles.modalMapTypesTitleView}>
        <Text
          style={[
            {color: colors.mapStylesModalTitleFontColor},
            styles.modalMapTypesTitleText,
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
            }}>
            <Text>{item.Plate}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  modalVehiclesFilterView: {
    width: 250,
    height: 200,
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
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  modalMapTypesTitleText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  modalMapTypesContentView: {
    width: '100%',
    height: '100%',
    borderTopWidth: 0.8,
  },
});
