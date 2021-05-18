import React, {useReducer, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REACT_APP_VOT_API_URL} from '@env';
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
        console.log(uri);

        const response = await fetch(uri, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        });

        if (!response.ok) {
          const message = `Ha focurrido un error: ${response.status}`;
          throw new Error(message);
        }

        const token = await response.json();
        await AsyncStorage.setItem('userToken', token);
        dispatch(createAction('SET_TOKEN', token));
      },
      logout: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch(createAction('REMOVE_TOKEN'));
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
