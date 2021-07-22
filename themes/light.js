import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    backgroundGrey: '#f2f2f2',
    primary: '#42A1D7',
    text: '#999999',
    menuButtonContent: 'white',
    modalButtonContent: '#c2c2c2',
    modalButtonText: '#222222',
    iconInput: 'grey',
    backgroundFAB: '#fff',
    textFAB: '#2f2f2f',
  },
};
