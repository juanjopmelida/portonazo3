import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    backgroundGrey: '#2f2f2f',
    primary: '#42A1D7',
    text: 'black',
    menuButtonContent: 'white',
    iconInput: 'grey',
  },
};
