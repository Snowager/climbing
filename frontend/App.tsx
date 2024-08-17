import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';
import Home from './components/home';
import PictureView from './pages/pictureView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import overlayView from './pages/overlayView';
import MobileOverlayView from './pages/mobileOverlayView';

// 
const Tab = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Camera: undefined,
  Overlay: {uri: string},
}

// Root point for the Climbing UI Notes App (Possible name - Beta Trackr ?)
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
          <Tab.Screen name="Camera" component={PictureView} />
          <Tab.Screen name="Overlay" component={MobileOverlayView} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

