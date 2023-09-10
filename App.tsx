import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import DetailTaskScreen from './screens/DetailTaskScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
  AddTaskScreen: {
    screen: AddTaskScreen
  },
  DetailTaskScreen: {
    screen: DetailTaskScreen
  },
})
export default createAppContainer(StackNavigator)
