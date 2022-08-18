import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet, Text} from "react-native";
import React, { useState, useEffect, componentDidUpdate } from 'react';

const auth = getAuth();

const CreateAccount = ({navigation, route}) => {

    handlePress = () => {
        route.params.createAC(auth, userName, password);
    }

    const [userName, changeUsername] = useState("");
    const [password, changePassword] = useState("");
  return(<View style = {styles.container}>
    <TextInput onChangeText = {changeUsername} placeholder = {"Username"} autoCapitalize = 'none'/>
    <TextInput onChangeText = {changePassword} placeholder = {"Password"} autoCapitalize = 'none'/>
    <Button title = {"Create Account"} onPress = {handlePress}/>
    <Button title = {"Go back"} onPress = {() => navigation.navigate("Login")}/>
</View>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CreateAccount;