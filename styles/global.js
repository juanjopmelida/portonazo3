import {StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTile: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
  },
  text: {
    fontFamily: 'OpenSans',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#004B9B',
  },
  textButton: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    marginTop: 20,
  },
  shadow: {
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
  },
  linearGradientButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  textColorOrangeReale: {
    color: '#EFB100',
  },
  textColorBlueReale: {
    color: '#004791',
  },
  textColorBlueViasat: {
    color: '#41A0D7',
  },
});

export default globalStyles;
