import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import DetailTaskScreen from './screens/DetailTaskScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import TimeScreen from './screens/TimeScreen';
import RoomScreen from './screens/RoomScreen';
const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
  RoomScreen: {
    screen: RoomScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  ForgotPasswordScreen:{
    screen: ForgotPasswordScreen
  },
  TimeScreen: {
    screen: TimeScreen
  }
  }, {
    initialRouteName: "LoginScreen"
})
export default createAppContainer(StackNavigator)
