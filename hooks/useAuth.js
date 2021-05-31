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
      login: async (formData, rememberMe) => {
        const uri = `${REACT_APP_VOT_API_URL}/security/authentication/login`;
        const response = await fetch(uri, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        });

        if (!response.ok) {
          const message = `Ha focurrido un error: ${response.status}`;
          throw new Error(message);
        }

        const responseJSON = await response.json();

        if (responseJSON.resultMessage) {
          throw new Error(responseJSON.resultMessage);
        }

        const token = responseJSON;
        await AsyncStorage.setItem('USER_TOKEN', JSON.stringify(token));

        if (rememberMe) {
          const user = {
            username: formData.username,
            password: formData.password,
          };
          await AsyncStorage.setItem('USER', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('USER');
        }

        dispatch(createAction('SET_TOKEN', token));
      },
      logout: async () => {
        await AsyncStorage.removeItem('USER_TOKEN');
        dispatch(createAction('REMOVE_TOKEN'));
      },
    }),
    [],
  );

  React.useEffect(() => {
    AsyncStorage.getItem('USER_TOKEN').then(JSONToken => {
      if (JSONToken) {
        token = JSON.parse(JSONToken);
        dispatch(createAction('SET_TOKEN', token));
      }
      dispatch(createAction('SET_LOADING', false));
    });
  }, []);

  return {auth, state};
};
