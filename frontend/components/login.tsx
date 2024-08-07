import { StyleSheet, View } from 'react-native';
import TopBar from './topBar';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';
import { ReactElement } from 'react';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'Login'>

type Props = {
    navigation: NavigationProps
}

export default function Login({navigation}): ReactElement<Props> {
    return (
        <View style={styles.container}>
            <TopBar/>
            <View style={styles.mainPane}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainPane: {
        flex: 1,
        maxHeight: 1000,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });