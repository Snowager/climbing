import { StyleSheet, View } from 'react-native';
import TopBar from './topBar';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
    return (
        <View style={styles.container}>
            <TopBar />
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
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
});