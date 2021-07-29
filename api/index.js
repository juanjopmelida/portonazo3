export * from './aggregation';
export * from './permission';
export * from './vehicle';
export * from './realtime';
export * from './fleet';
export * from './journeys';
// import {REACT_APP_VL_API_URL, REACT_APP_NUMBER_OF_POSITIONS} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const getLastPositions = async params => {
//   const {plate, companyId, deviceId, deviceTypeId} = params;

//   const uri = REACT_APP_VL_API_URL + 'Device/GetLastPositions';

//   const body = {
//     bbdd: companyId,
//     numPositions: REACT_APP_NUMBER_OF_POSITIONS,
//     deviceFilterList: [
//       {
//         serialNumber: deviceId,
//         idDeviceType: deviceTypeId,
//         plate: plate,
//       },
//     ],
//   };

//   const response = await fetch(uri, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {'Content-type': 'application/json; charset=UTF-8'},
//   });

//   if (!response.ok) {
//     const message = `Ha ocurrido un error: ${response.status}`;
//     throw new Error(message);
//   }

//   const data = await response.json();
//   return data;
// };
