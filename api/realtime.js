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
      const realTime = getRealTimeById(id)
        .then(res => {
          //console.log(res.data);
          return res.data;
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      return realTime;
    }),
  );
};

const getAllRealTimeDetails = vehiclesIds => {
  return Promise.all(
    vehiclesIds.map(async id => {
      const realTimeDetails = getRealTimeDetailsById(id)
        .then(res => {
          //console.log(res.data);
          return res.data;
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      return realTimeDetails;
    }),
  );
};

const getAllAddress = vehiclesIds => {
  return Promise.all(
    vehiclesIds.map(async id => {
      const address = getAddressById(id)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      return address;
    }),
  );
};

const getRealTimeById = async id => {
  const uri = `${localhostServer}/RealTime/${id}`;
  return axios.get(uri);
};

const getRealTimeDetailsById = async id => {
  const uri = `${localhostServer}/RealTimeDetails/${id}`;
  return axios.get(uri);
};

export const getAddressById = async id => {
  const uri = `${localhostServer}/Address/${id}`;
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

export const getAllAddressByIds = async vehiclesIds => {
  const addresses = await getAllAddress(vehiclesIds);
  AsyncStorage.setItem('ADDRESSES', JSON.stringify(addresses));
  return addresses;
};
