import { View, StyleSheet, Text} from "react-native";
import React, { useState, useEffect } from 'react';
import {db} from '../Components/Firestore.js'
import {getDoc, doc } from 'firebase/firestore'
import FollowUnfollow from '../Components/FollowUnfollow.js';

const UserPage = ({route}) => {
  const [favArtist, setFavArtist] = useState([" "," "," "," "," "]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [docRef, setDocRef] = useState("");
  const [userSet, setUsetSet] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
    doStuff = async() => {
      id = route.params.id;
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      if (docSnap.data().favArtists) {
        setFavArtist(docSnap.data().favArtists);
      } //If the user has connected their spotify, set the favorite artists array to their favorite artists
      else {
        setFavArtist(["No Artist Yet!", "No Artist Yet!", "No Artist Yet!", "No Artist Yet!", "No Artist Yet!"]);
      } //If the user has not connected their spotify, set each item in the favorite artists array to say 'No artist Yet!'
      setFollowers(docSnap.data().followers);
      setFollowing(docSnap.data().following);
      setUser(docSnap);
      setDocRef(userRef);
      let currUser = route.params.currentUserRef;
      setCurrentUser(currUser);
      setUsetSet(1);
    }
    doStuff();
  }, [])

  if (userSet === 1) {
    return (<View style = {styles.container}>
        <Text>{route.params.name}</Text>
        <Text>{favArtist[0]}</Text>
        <Text>{favArtist[1]}</Text>
        <Text>{favArtist[2]}</Text>
        <Text>{favArtist[3]}</Text>
        <Text>{favArtist[4]}</Text>
        <Text>{`Followers: ${followers}`}</Text>
        <Text>{`Following: ${following}`}</Text>
        <FollowUnfollow user = {user} currUser = {currentUser} docRef = {docRef}/>
    </View>);
  }
  else {
    return(<Text>Loading...</Text>)
  }
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