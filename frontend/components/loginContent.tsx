import { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "./loginForm";

export default function LoginContent(): ReactElement {
    return (
        <View style={styles.authContent}>
          <LoginForm/>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#fc9",
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        maxHeight: 1000,
        height: 400,
        width: 300,
      },
      buttons: {
        marginTop: 8,
      },
    });