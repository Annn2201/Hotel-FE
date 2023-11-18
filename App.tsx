import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RoomScreen from './screens/RoomScreen';
import DetailRoomScreen from "./screens/DetailRoomScreen";
import ListBookingRoomScreen from "./screens/ListBookingRoom";
import UserDetailScreen from "./screens/UserDetailScreen";
import UpdateUserDetailScreen from "./screens/UpdateUserDetailScreen";
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
  UpdateUserDetailScreen: {
    screen: UpdateUserDetailScreen
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
