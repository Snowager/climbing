import React, {ReactElement} from "react";
import { View, StyleSheet, Text } from "react-native";
import LoginForm from "./loginForm";

export default function LoginContent(): ReactElement {
    return (
      <>
        <Text style={styles.title}>Login Screen</Text>
        <View style={styles.authContent}>
          <LoginForm/>
        </View>
      </>
      );
    }
    
    const styles = StyleSheet.create({
      authContent: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
      title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
      },
      buttons: {
        marginTop: 8,
      },
    });