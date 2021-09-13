import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    backgroundGrey: '#f2f2f2',
    borderActive: '#acacac',
    borderInactive: '#dfdfdf',
    primary: '#42A1D7',
    text: '#0f0f0f',
    menuButtonContent: 'white',
    modalButtonContent: '#c2c2c2',
    modalButtonText: '#222',
    iconInput: 'grey',
    backgroundFAB: '#f9f9f9',
    textFAB: '#454545',
    mapStylesModalTitleFontColor: '#fff',
    mapStylesModalTitleBackgroundColor: '#A6A6A6',
    mapStylesModalViewFontColor: '#454545',
    mapStylesModalViewBorderColor: '#454545',
  },
};
