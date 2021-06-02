import {StyleSheet, Platform} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    textAlignVertical: 'center',
    lineHeight: 40,
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
  dividerLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
});

export default globalStyles;
