import {REACT_APP_MOCK_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getAggregation = async idAggregation => {
  const uri = REACT_APP_MOCK_SERVER + '/' + idAggregation;
  const token = await AsyncStorage.getItem('USER_TOKEN');

  return axios.get(uri, {
    Headers: {Authorization: `Bearer ${token}`},
  });
};
