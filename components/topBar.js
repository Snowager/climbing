import { StyleSheet, Text, View } from 'react-native';

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
      maxHeight: '100px',
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    },
  });