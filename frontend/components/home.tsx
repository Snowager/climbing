import { StyleSheet, View, Text } from 'react-native';
import TopBar from './topBar';
import { ReactElement, useContext } from 'react';
import { UserContext } from '../context/authContext';

// View pane for the home page screen
export default function Home(): ReactElement {
    const {user} = useContext(UserContext);
    return (
        
        <View style={styles.container}>
            <TopBar />
            {user && user.email && <Text>{user.email}</Text>}
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