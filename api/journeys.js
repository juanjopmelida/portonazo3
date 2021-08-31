import {Platform} from 'react-native';
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const localhostServer =
  Platform.OS === 'ios'
    ? REACT_APP_MOCK_SERVER_IOS
    : REACT_APP_MOCK_SERVER_ANDROID;

export const getMockedJourneys = async dateFilter => {
  const uri = `${localhostServer}/Journeys?JourneyStart_gte=${dateFilter.startDate}&JourneyEnd_lte=${dateFilter.endDate}`;
  console.log(uri);
  const res = await axios.get(uri);
  //console.log('Journeys: ', res.data);
  //AsyncStorage.setItem('FLEET', JSON.stringify(fleet.data));
  return res.data;
};
