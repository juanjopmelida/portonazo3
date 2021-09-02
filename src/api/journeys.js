import {Platform} from 'react-native';
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import axios from 'axios';

const localhostServer =
  Platform.OS === 'ios'
    ? REACT_APP_MOCK_SERVER_IOS
    : REACT_APP_MOCK_SERVER_ANDROID;

export const getMockedJourneys = async filters => {
  const uri = `${localhostServer}/Journeys?VehicleId=${filters.vehicleId}&JourneyStart_gte=${filters.startDate}&JourneyEnd_lte=${filters.endDate}`;
  //const uri = `${localhostServer}/Journeys`;
  console.log(uri);
  const res = await axios.get(uri);
  //console.log('Journeys: ', res.data);
  //AsyncStorage.setItem('FLEET', JSON.stringify(fleet.data));
  return res.data;
};
