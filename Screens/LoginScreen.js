import { getAuth } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from 'react';

const auth = getAuth()

const LoginScreen = ({navigation, route}) => {
  const [userName, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  handlePress = () => {
    route.params.login(auth, userName, password);
  } //Uses the firebase function for login when the user presses the login button

  return(<View style = {styles.container}>
    <TextInput onChangeText = {changeUsername} placeholder = {"Email"} autoCapitalize = 'none'/>
    <TextInput secureTextEntry = {true} onChangeText = {changePassword} placeholder = {"Password"} autoCapitalize = 'none'/>
    <Button title = {"Login"} onPress = {handlePress}/>
    <Button title = {"Don't have an account?"} onPress = {() => navigation.navigate("createAccount")}/>
</View>); //Display the login screen to the user, prompt them to make an accoount if they do not have one yet. 
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