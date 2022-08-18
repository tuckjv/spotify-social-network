import app from './Components/Firebase.js'
import { AppState, StyleSheet, Text, View, } from 'react-native';
import MainScreen  from './Screens/MainScreen.js'
import ProfileScreen  from './Screens/Profile.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState, useEffect, componentDidUpdate } from 'react';
import LoginScreen from './Screens/LoginScreen.js'
import CreateAccount from './Screens/CreateAccount.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import PickUsername from './Screens/Username.js'
import CreatePost from './Screens/CreatePost.js'
import 'react-native-gesture-handler'; 
import { getDoc, doc } from 'firebase/firestore';
import {db} from './Components/Firestore.js'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  const [loggedIn, setLoggedIn] = useState(0);
  const [user, setUser] = useState("");

  createAC = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setLoggedIn(2);
      setUser(userCredential.user);
    })
  } //Create new user with firebase
  
  login = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      setLoggedIn(1)
    })
  } //Authenticate user login with firebase and get the user data

  const validateUsername = async () => {
    setLoggedIn(1);
  } //After the user validates their username, bring them into the app

  const logOut = () => {
    setLoggedIn(0);
  } //When the user wants to log out, reset the logged in state to 0

  if (loggedIn === 0) {
    return (<NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown : false}}>
        <Stack.Screen name = "Login" component = {LoginScreen} initialParams = {{login}}/>
        <Stack.Screen name = "createAccount" component = {CreateAccount} initialParams = {{createAC}}/>
      </Stack.Navigator>
    </NavigationContainer>);
  } //If the user is not logged in, prompt them to login or create an account
  if (loggedIn === 2) {
    return(
      <View style = {styles.container}>
        <PickUsername userID = {user.uid} vUser = {validateUsername}/>
      </View>
    );
  } //If the user has created an account but has not picked a username, bring them to the pickUsername screen
  if (loggedIn === 1) {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions = {{headerShown: false}}>
          <Tab.Screen name = "Main" component = {MainScreen} initialParams = {{user: user.uid}}/>
          <Tab.Screen name = "Profile" component = {ProfileScreen} initialParams = {{logOut, user: user.uid}}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  } //If the user is logged in, bring them to their feed
} //Driver for the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
