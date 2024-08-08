import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

// TopBar component for displaying a top bar
export default function TopBar(): ReactElement {
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