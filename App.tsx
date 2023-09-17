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
const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  DetailTaskScreen: {
    screen: DetailTaskScreen
  },
  ForgotPasswordScreen:{
    screen: ForgotPasswordScreen
  },
  AddTaskScreen: {
    screen: AddTaskScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
})
export default createAppContainer(StackNavigator)
