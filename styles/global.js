import {StyleSheet, Platform} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  input: {},
  button: {
    backgroundColor: '#004B9B',
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default globalStyles;
