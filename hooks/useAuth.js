import React, {useReducer, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REACT_APP_VOT_API_URL} from '../config';
import {createAction} from '../utils/createAction';

export const useAuth = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_TOKEN':
          return {
            ...state,
            token: {...action.payload},
          };
        case 'REMOVE_TOKEN':
          return {
            ...state,
            token: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );

  const auth = useMemo(
    () => ({
      login: async formData => {
        const uri = `${REACT_APP_VOT_API_URL}/security/authentication/login`;
        const response = await fetch(uri, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        });

        if ('response.ok') {
          const message = `Ha ocurrido un error: ${response.status}`;
          throw new Error(message);
        }

        const responseJSON = await response.json();

        if (responseJSON.resultMessage) {
          throw new Error(responseJSON.resultMessage);
        }

        const token = responseJSON;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userName', formData.username);
        dispatch(createAction('SET_TOKEN', token));
      },
    }),
    [],
  );

  React.useEffect(() => {
    AsyncStorage.getItem('userToken').then(token => {
      if (token) {
        dispatch(createAction('SET_TOKEN', token));
      }
      dispatch(createAction('SET_LOADING', false));
    });
  }, []);

  return {auth, state};
};
