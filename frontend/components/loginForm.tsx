import { ReactElement, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { createNewUser } from "../util/auth";

export default function LoginForm(): ReactElement {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
    return (
        <View>
            <Text style={{alignContent:'center'}}>Login Form for {name}</Text>
            <TextInput value={name} onChangeText={text => setName(text)} style={styles.inputForm}/>
            <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.inputForm}/>
            <Button title="Login" onPress={() => setToken(createNewUser(`${name}`, `${email}`))} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      buttons: {
        marginTop: 8,
      },
      inputForm: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 2,
        elevation:3,
        marginHorizontal: 10,
        backgroundColor: '#ffff',
        borderRadius: 25,
        shadowOffset:{width:1, height:1},
        shadowColor: "black",
        shadowOpacity: .8,
        shadowRadius:24,
      }
    });