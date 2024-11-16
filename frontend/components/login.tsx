import { StyleSheet, View } from 'react-native';
import TopBar from './topBar';
import { ReactElement } from 'react';
import LoginContent from './loginContent';

// Login page component --TODO-- implement login functionality in later sprint task
export default function Login(): ReactElement {
    return (
        <View style={styles.container}>
            <TopBar/>
            <View style={styles.mainPane}>
                <LoginContent/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainPane: {
        flex: 1,
        maxHeight: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    });