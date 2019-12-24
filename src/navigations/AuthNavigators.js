import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

const AppNavigator = createStackNavigator(
  {
    Loginscreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Userdetailsscreen: {
      screen: UserDetailsScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Loginscreen',
  },
);

export default AppContainer = createAppContainer(AppNavigator);
