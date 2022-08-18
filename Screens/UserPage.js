import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet, Text} from "react-native";
import React, { useState, useEffect, componentDidUpdate } from 'react';
import {db} from '../Components/Firestore.js'
import {getDoc, doc, setDoc} from 'firebase/firestore'
import FollowUnfollow from '../Components/FollowUnfollow.js';

const UserPage = ({navigation, route}) => {
  const [favArtist, setFavArtist] = useState([" "," "," "," "," "]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [docRef, setDocRef] = useState("");
  const [userSet, setUsetSet] = useState(0);
  const [user, setUser] = useState(0);
  const [currentUserRef, setCurrentUserRef] = useState("");

  useEffect(() => {
    doStuff = async() => {
      id = route.params.id;
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      if (docSnap.data().favArtists) {
        setFavArtist(docSnap.data().favArtists);
      }
      else {
        setFavArtist(["No Artist Yet!", "No Artist Yet!", "No Artist Yet!", "No Artist Yet", "No Artist Yet"]);
      }
      setFollowers(docSnap.data().followers);
      setFollowing(docSnap.data().following);
      setUser(docSnap);
      setDocRef(userRef);
      setCurrentUserRef(route.params.currentUserRef);
      setUsetSet(1);
      currUser = route.params.currUser;
      setCurrentUser(currUser);
    }
    doStuff();
  }, [])


    return (<View style = {styles.container}>
        <Text>{route.params.name}</Text>
        <Text>{favArtist[0]}</Text>
        <Text>{favArtist[1]}</Text>
        <Text>{favArtist[2]}</Text>
        <Text>{favArtist[3]}</Text>
        <Text>{favArtist[4]}</Text>
        <Text>{`Followers: ${followers}`}</Text>
        <Text>{`Following: ${following}`}</Text>
        <FollowUnfollow user = {user} currUser = {currentUser} userSet = {userSet} docRef = {docRef} currentUserRef = {currentUserRef}/>
    </View>);
}

export default UserPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });