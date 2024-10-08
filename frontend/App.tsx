import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';
import Home from './components/home';
import PictureView from './pages/pictureView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import overlayView from './pages/overlayView';
import MobileOverlayView from './pages/mobileOverlayView';
import * as MediaLibrary from 'expo-media-library'
import { Dimensions, View } from 'react-native';

// 
const Tab = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Camera: undefined,
  Overlay: {imageAsset: MediaLibrary.Asset},
}

// Root point for the Climbing UI Notes App (Possible name - Beta Trackr ?)
export default function App() {
  return (
    <>
    <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
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
      </View>
    </>
  );
}

