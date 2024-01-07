import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import ContextProvider from './src/context/MyContext';
import  AuthContextProvider from './src/context/AuthContext';
import Toast from 'react-native-toast-message'
function App() {
  return (
    <AuthContextProvider>
      <ContextProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
        <Toast />
      </ContextProvider>
    </AuthContextProvider>
  );
};


export default App;
