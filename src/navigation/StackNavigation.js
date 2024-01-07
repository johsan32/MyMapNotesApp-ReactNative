import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../utils/Routes';
import AddTrip from '../screen/mapTrip/AddTrip';
import TripList from '../screen/mapTrip/TripList';
import LoginScreen from '../screen/intro/Login';
import RegisterScreen from '../screen/intro/Register';
import HeaderLeft from './HeaderLeft';
import {MyColor} from '../theme/colors';
import DrawerNavigation from './DrawerNavigation';
import EditList from '../screen/mapTrip/EditList';
import TripDetail from '../screen/mapTrip/TripDetail';
import HomeScreen from '../screen/home';
import OnboardingScreen from '../screen/intro/OnboardingScreen';
import GuestScreen from '../screen/intro/GuestScreen';
import HeaderRight from './HeaderRight';

const Stack = createNativeStackNavigator();

function StackNavigation() {


  return (
    <Stack.Navigator
      initialRouteName={Routes.INTRO}
      screenOptions={{
        headerBackVisible: false,
        headerShadowVisible: false,
        statusBarStyle: 'dark',
        statusBarColor: MyColor.white,
        headerTitleAlign: 'center',
        headerLeft: () => <HeaderLeft />,
      }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          headerShown: false,
          statusBarColor: 'white',
        }}
      />
      <Stack.Screen
        name={Routes.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
          headerShadowVisible: true,
          statusBarStyle: 'light',
        }}
      />
      <Stack.Screen
        name={Routes.REGISTER}
        component={RegisterScreen}
        options={{
          statusBarColor: 'transparent',
          statusBarTranslucent: true,
          headerShown: false,
          headerShadowVisible: true,
          headerTitle: '',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.GUEST}
        component={GuestScreen}
        options={{headerShown: true, headerShadowVisible: false}}
      />

      <Stack.Screen
        name={Routes.INTRO}
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={Routes.ADDTRIP} component={AddTrip} />
      <Stack.Screen name={Routes.TRIPLIST} component={TripList} options={{headerRight:()=>
      <HeaderRight />
      
      }} />
      <Stack.Screen name={Routes.EDITLIST} component={EditList} />
      <Stack.Screen name={Routes.TRIPDETAIL} component={TripDetail} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
