import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/home';
import PictureView from './pages/pictureView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MobileOverlayView from './pages/mobileOverlayView';
import * as MediaLibrary from 'expo-media-library'
import { Dimensions, View } from 'react-native';
import LoginView from './pages/loginView';
import { createContext } from 'react';
import AuthContext from './context/authContext';

// 
const Tab = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined,
  Loginmnn: undefined,
  Camera: undefined,
  Overlay: {imageAsset: MediaLibrary.Asset},
}

// Root point for the Climbing UI Notes App (Possible name - Beta Trackr ?)
export default function App() {

  const UserContext = createContext(null);
  return (
    <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
      <AuthContext>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#ca3',
            tabBarInactiveTintColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarInactiveBackgroundColor: '#000',
          })}>
          <Tab.Screen name="Loginmnn" component={LoginView} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Camera" component={PictureView} />
          <Tab.Screen name="Overlay" component={MobileOverlayView} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
      </AuthContext>
    </View>
  );
}

