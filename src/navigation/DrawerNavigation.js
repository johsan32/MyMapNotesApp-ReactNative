import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Routes} from '../utils/Routes';
import LoginPage from '../screen/intro/Login';
import HomeScreen from '../screen/home';
import DrawerContent from './DrawerContent';
import {MyColor} from '../theme/colors';
import {StyleSheet, TouchableHighlight, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();
  const CustomHeaderTitle = () => (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/images/header.png')}
        style={{width: 150, height: 40}}
      />
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: MyColor.secondary,
        },
        headerTitle: props => <CustomHeaderTitle {...props} />,
        headerTransparent: true,
        cardStyle: {backgroundColor: 'white'},
        headerTintColor: MyColor.white,
        headerLeft: () => {
          return (
            <TouchableHighlight style={styles.container}>
              <Icon
                name="menu-fold"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color={MyColor.icon}
              />
            </TouchableHighlight>
          );
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen name={Routes.HOME} component={HomeScreen} />
      <Drawer.Screen name={Routes.LOGIN} component={LoginPage} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;

const styles = StyleSheet.create({});
