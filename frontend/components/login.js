import { StyleSheet, Text, View } from 'react-native';
import TopBar from './topBar';

export default function Login({navigation}) {
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
        maxHeight: '1000px',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });