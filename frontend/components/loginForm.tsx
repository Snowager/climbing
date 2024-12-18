import React, { ReactElement, useEffect, useState, useContext, useMemo } from "react";
import { View, StyleSheet, Text, TextInput, Button, Pressable, ToastAndroid, Alert } from "react-native";
import { createNewUser, signInUser, auth } from "../util/auth";
import { useNavigation } from "@react-navigation/native";
import { ErrorContext, UserContext } from "../context/authContext";
import ErrorPopup from "./errorPopup";

export default function LoginForm(): ReactElement {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {signup, login, user, logout} = useContext(UserContext);
  const {error, setError} = useContext(ErrorContext);

  
  //const navigation = useNavigation();

  // useEffect(() => {
  //   return navigation.addListener('blur', () => {
  //     console.log("trigger")
  //     auth.signOut();
  //     setUser({email:null, uid:null})
  //   });
  // })

  useEffect(() => {
    if (user) console.log("token :"+user?.uid)
  }, [user])

  const gui = useMemo(() => {
    return (
      <View style={styles.inputContainer}>
          {user && user.email && <Text>{user.email}</Text>}
          <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.inputForm} placeholder="Email" placeholderTextColor="#c0c0c0"/>
          <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.inputForm} placeholder="Password" secureTextEntry placeholderTextColor="#c0c0c0"/>
          <Pressable onPress={() => {
            console.log(email), 
            signInUser(auth, email, password, setError)}} style={{width: "100%", display:'flex', alignItems:'center'}}>
            <View style={styles.loginButton}>
              <Text>
              Login
              </Text>
            </View>
          </Pressable>
            <Pressable style={{width: "100%", display:'flex', alignItems:'center'}} onPress={() => {createNewUser(auth, email, password, setError)}}>
              <View style={styles.signUpButton}><Text>Sign Up</Text></View></Pressable>
              <Pressable style={{width: "100%", display:'flex', alignItems:'center'}} onPress={() => {logout()}}>
              <View style={styles.signUpButton}><Text>Logout</Text></View></Pressable>
              {error && <ErrorPopup setOpen={() => setError("")}><Text style={{color: 'white'}}>{error}</Text></ErrorPopup>}
      </View>
    );
  }, [user, email, password, error])
    
  return (
    <>{gui}</>
  )
}
    
const styles = StyleSheet.create({
  buttons: {
    marginTop: 8,
  },
  inputContainer: {
    width: "100%",
    display: 'flex',
    alignItems: 'center',
  },
  inputForm: {
    width: "80%",
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    margin: 12,
    marginBottom: 30,
    elevation:3,
    marginHorizontal: 10,
    backgroundColor: '#ffff',
    borderRadius: 25,
    shadowOffset:{width:1, height:1},
    shadowColor: "black",
    shadowOpacity: .8,
    shadowRadius:24,
  },
  loginButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#fca0f3",
    elevation: 3,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    color: "#0aa6fa",
    width: "50%",
    height: 40,
    backgroundColor: "#fca0f3",
    elevation: 3,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
});