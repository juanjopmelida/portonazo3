import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    console.log('ERROR BOUNDARY');
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    // si queremos sacar info del error
  }

  destroyAuthToken = async () => {
    // borramos lo que queramos del Storage
    // await AsyncStorage.removeItem()
  };

  handleBackToSignIn = async () => {
    await this.destroyAuthToken();
    // se puede usar RNRestart para reiniciar la app
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 32}}>Oops, Something Went Wrong</Text>
          <Text style={{marginVertical: 10, lineHeight: 23, fontWeight: '500'}}>
            The app ran into a problem and could not continue. We apologise for
            any inconvenience this has caused! Press the button below to restart
            the app and sign back in. Please contact us if this issue persists.
          </Text>
          {/* <Button
                label={'Back to Sign In Screen'}
                onPress={() => this.handleBackToSignIn()}
                style={{
                  marginVertical: 15,
                }}
              /> */}
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorBoundary;
