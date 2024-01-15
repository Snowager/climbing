import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';
import Home from './components/home';
import PictureView from './pages/pictureView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#ca3',
            tabBarInactiveTintColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarInactiveBackgroundColor: '#000',
          })}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Picturess" component={PictureView} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

