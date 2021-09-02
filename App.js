import 'react-native-gesture-handler';
import React, {useState, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';

import {SplashScreen} from './src/screens/SplashScreen';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';
import {UserContext} from './src/contexts/UserContext';
import {ThemeContext} from './src/contexts/ThemeContext';
import {AuthContext} from './src/contexts/AuthContext';
import {darkTheme} from './src/themes/dark';
import {lightTheme} from './src/themes/light';
import {useAuth} from './src/hooks/useAuth';

const RootStack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const {auth, state} = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return state.token ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={state.token}>
              <MainStackNavigator />
            </UserContext.Provider>
          </QueryClientProvider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar style={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
