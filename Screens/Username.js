import { View, TextInput, Button, StyleSheet, Text, Alert} from "react-native";
import React, { useState, useEffect, componentDidUpdate } from 'react';
import {db} from '../Components/Firestore.js'
import {getDoc, doc, setDoc} from 'firebase/firestore'

const PickUsername = (props) => {
    const [userName, changeUsername] = useState("");

    const handlePress = async () => {
        const docRef = doc(db, "usernameAv", userName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        Alert.alert("Username Taken")
        } //There is a document in the username Availability collection with this username, 
        //so we must let the user know it's taken
        else {
            await setDoc(doc(db, "usernameAv", userName), {
                id: props.userID,
            }) //Add username to the username availability collection
            await setDoc(doc(db, "users", props.userID), {
                name: userName,
                following: 0,
                followers: 0,
                followingID: [],
                recentPosts: [],
            }) //Create a blank new user
            props.vUser();
        } //Create a new user document and add it to the users collection, add the uername to the username availability collection
    } //Create a new user when the user presses "submit username"

    return(
        <View>
            <TextInput onChangeText = {changeUsername} placeholder = {"Username"} autoCapitalize = 'none'/>
            <Button title = {'Submit Username'} style = {styles.container} onPress = {handlePress}/>
        </View>);
} //A screen on which the user can pick a username for their account

export default PickUsername;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });