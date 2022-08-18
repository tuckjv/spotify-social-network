import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet, Text} from "react-native";
import React, { useState, useEffect, componentDidUpdate } from 'react';

const auth = getAuth()

const LoginScreen = ({navigation, route}) => {

  handlePress = () => {
    route.params.login(auth, userName, password);
  }

  const [userName, changeUsername] = useState("");
    const [password, changePassword] = useState("");
  return(<View style = {styles.container}>
    <TextInput onChangeText = {changeUsername} placeholder = {"Email"} autoCapitalize = 'none'/>
    <TextInput secureTextEntry = {true} onChangeText = {changePassword} placeholder = {"Password"} autoCapitalize = 'none'/>
    <Button title = {"Login"} onPress = {handlePress}/>
    <Button title = {"Don't have an account?"} onPress = {() => navigation.navigate("createAccount")}/>
</View>);
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });