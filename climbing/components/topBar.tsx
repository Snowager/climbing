import { StyleSheet, View } from 'react-native';
import React from 'react'

export default function TopBar() {
  return (
    <View style={styles.topBar}>
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