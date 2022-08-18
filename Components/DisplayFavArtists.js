import {Text, View} from 'react-native';
import React from 'react';
import  {doc,updateDoc} from "firebase/firestore";
import {db} from "./Firestore.js";

function DisplayFavArtists(props) {
    const updateFirestore = async () => {
        const userRef = doc(db, "users", props.id);
        await updateDoc(userRef, {
            favArtists: props.favArt
        });
    } //When the user logs into spotify, update their user document with their favorite artists
    if (props.arv == 1) {
        updateFirestore();
        return (
            <View>
                <Text>{props.favArt[0]}</Text>
                <Text>{props.favArt[1]}</Text>
                <Text>{props.favArt[2]}</Text>
                <Text>{props.favArt[3]}</Text>
                <Text>{props.favArt[4]}</Text>
            </View>
        )
    } //If there is a valid array of favorite artists, update firestore and display them on the profile screen
    else {
        return (
            <Text>Please Connect Spotify Account to View Top Artists</Text>
        )
    } //If the user has not logged into spotify, ask them to
}

export default DisplayFavArtists;