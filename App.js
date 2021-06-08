import 'react-native-gesture-handler';
import React, {useState, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from "react-query"

import {SplashScreen} from './views/SplashScreen';
import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {UserContext} from './contexts/UserContext';
import {ThemeContext} from './contexts/ThemeContext';
import {AuthContext} from './contexts/AuthContext';
import {darkTheme} from './themes/dark';
import {lightTheme} from './themes/light';
import {useAuth} from './hooks/useAuth';

const RootStack = createStackNavigator();
const queryClient = new QueryClient()

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
