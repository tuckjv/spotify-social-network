import { getAuth} from 'firebase/auth';
import { View, TextInput, Button, StyleSheet} from "react-native";
import React, { useState } from 'react';

const auth = getAuth();

const CreateAccount = ({navigation, route}) => {

    handlePress = () => {
        route.params.createAC(auth, userName, password);
    } //When the user presses the create account button, use the firebase function for creating an account

    const [userName, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    return(<View style = {styles.container}>
    <TextInput onChangeText = {changeUsername} placeholder = {"Email"} autoCapitalize = 'none'/>
    <TextInput onChangeText = {changePassword} placeholder = {"Password"} autoCapitalize = 'none'/>
    <Button title = {"Create Account"} onPress = {handlePress}/>
    <Button title = {"Go back"} onPress = {() => navigation.navigate("Login")}/>
</View>); //Allow for the user to input the email and password they want to use for the account
} //A screen which allows for a user to input the information they want to use for their new account

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CreateAccount;