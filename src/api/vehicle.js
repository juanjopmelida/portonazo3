import {Platform} from 'react-native';
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const localhostServer =
  Platform.OS === 'ios'
    ? REACT_APP_MOCK_SERVER_IOS
    : REACT_APP_MOCK_SERVER_ANDROID;
const randomNumber = range => Math.floor(Math.random() * range) + 1;

const getAllVehicles = vehiclesIds => {
  //console.log(vehiclesIds);
  return Promise.all(
    vehiclesIds.map(async id => {
      const vehicle = getVehicleById(id)
        .then(res => {
          //console.log(res.data);
          return res.data;
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      return vehicle;
    }),
  );
};

const getVehicleById = async id => {
  const uri = `${localhostServer}/Vehicle/${id}`;
  return axios.get(uri);
};

export const getMockedVehicles = async () => {
  const vehiclesIds = Array.from({length: randomNumber(10)}, () =>
    randomNumber(10),
  );
  const NonDuplicatedVehiclesIds = Array.from(new Set(vehiclesIds));
  const vehicles = await getAllVehicles(NonDuplicatedVehiclesIds);
  //console.log('MOCKED VEHICLES:' + vehicles);
  AsyncStorage.setItem('VEHICLES', JSON.stringify(vehicles));
  return vehicles;
};

export const getMockedVehiclesByFleet = async () => {
  const fleetId = randomNumber(10);
  const uri = `${localhostServer}/vehicle?FleetId=${fleetId}`;
  const vehicles = await axios.get(uri);
  AsyncStorage.setItem('VEHICLES', JSON.stringify(vehicles.data));
  return vehicles.data;
};
