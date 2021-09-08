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
  const fleetId = randomNumber(11);
  console.log('FLEET:', fleetId);
  const uri = `${localhostServer}/vehicle?FleetId=${fleetId}`;
  const vehicles = await axios.get(uri).catch(error => {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('DATA:', error.response.data);
      console.log('STATUS:', error.response.status);
      console.log('HEADERS:', error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('REQUEST:', error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('ERROR PETICIÓN VEHICLES:', error.message);
    }
    console.log(error);
  });
  AsyncStorage.setItem('VEHICLES', JSON.stringify(vehicles.data));
  return vehicles.data;
};
