import {Platform} from 'react-native';
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const localhostServer =
  Platform.OS === 'ios'
    ? REACT_APP_MOCK_SERVER_IOS
    : REACT_APP_MOCK_SERVER_ANDROID;

const getAllRealTimes = vehiclesIds => {
  return Promise.all(
    vehiclesIds.map(async id => {
      const vehicle = getRealTimeById(id)
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

const getAllRealTimeDetails = vehiclesIds => {
  return Promise.all(
    vehiclesIds.map(async id => {
      const vehicle = getRealTimeDetailsById(id)
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

const getRealTimeById = async id => {
  const uri = `${localhostServer}/RealTime/${id}`;

  //console.log(uri);
  return axios.get(uri);
};

const getRealTimeDetailsById = async id => {
  const uri = `${localhostServer}/RealTimeDetails/${id}`;

  //console.log(uri);
  return axios.get(uri);
};

export const getAllRealTimeByIds = async vehiclesIds => {
  const realTimes = await getAllRealTimes(vehiclesIds);
  AsyncStorage.setItem('REAL_TIMES', JSON.stringify(realTimes));
  return realTimes;
};

export const getAllRealTimeDetailsByIds = async vehiclesIds => {
  const realTimeDetails = await getAllRealTimeDetails(vehiclesIds);
  AsyncStorage.setItem('REAL_TIME_DETAILS', JSON.stringify(realTimeDetails));
  return realTimeDetails;
};
