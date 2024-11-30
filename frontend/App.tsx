import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/home';
import PictureView from './pages/pictureView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView} from "react-native-gesture-handler"
import MobileOverlayView from './pages/mobileOverlayView';
import * as MediaLibrary from 'expo-media-library'
import { Dimensions, View, Text } from 'react-native';
import LoginView from './pages/loginView';
import { createContext } from 'react';
import AuthContext from './context/authContext';

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

  const UserContext = createContext(null);
  return (
    <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
      <GestureHandlerRootView style={{height: '100%', width: '100%'}}>
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
            <Tab.Screen name="Login" component={LoginView} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Camera" component={PictureView} />
            <Tab.Screen name="Overlay" component={MobileOverlayView} options={{
              header: () => <View style={{elevation:100, width:"100%", height:100, backgroundColor:'green', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute'}}><Text>Overlay</Text></View>
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
        </AuthContext>
      </GestureHandlerRootView>
    </View>
  );
}

