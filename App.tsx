import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import TimeScreen from './screens/TimeScreen';
import RoomScreen from './screens/RoomScreen';
import DetailRoomScreen from "./screens/DetailRoomScreen";
import ListBookingRoom from "./screens/ListBookingRoom";
import ListBookingRoomScreen from "./screens/ListBookingRoom";
import UserDetailScreen from "./screens/UserDetailScreen";
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
  },
  DetailRoomScreen: {
    screen: DetailRoomScreen
  },
  ListBookingRoomScreen: {
    screen: ListBookingRoomScreen
  },
  UserDetailScreen: {
    screen: UserDetailScreen
  }
  }, {
    initialRouteName: "LoginScreen",
    defaultNavigationOptions: {
      headerShown: false
    },
})
export default createAppContainer(StackNavigator)
