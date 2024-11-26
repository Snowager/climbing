import React, { ReactElement, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { UserContext } from '../context/authContext';

// TopBar component for displaying a top bar
export default function TopBar(): ReactElement {
  const {user} = useContext(UserContext);
  return (
    <View style={styles.topBar}>
      {user && user.email && <Text>{user.email}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    topBar: {
      display: 'flex',
      width: '100%',
      maxHeight: 100,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    },
  });