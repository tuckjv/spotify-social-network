import {View, Button} from 'react-native';
import React, {useState} from 'react';
import  {arrayUnion, doc,  updateDoc, increment, arrayRemove } from "firebase/firestore";
import {db} from "./Firestore.js";

const FollowUnfollow = (props) => {
    if (props.userSet == 0) {
        return null;
    } // If the user data has not finished loading, do not return anything

    const [isFollow, setIsFollow] = useState(0); 

    if (props.currUser.followingID.includes(props.user.id)) {
        setIsFollow(1)
    } //If the current user is already following the user they are looking at, make sure to display the unfollow button

    follow = async () => {
        setIsFollow(1);
        const currUserRef = doc(db, "users", props.currUser);
        await updateDoc(props.docRef, {
            followers: increment(1),
        });
        await updateDoc(currUserRef, {
            following: increment(1),
            followingID: arrayUnion(props.user.id),
        });
    } 
    unfollow = async () => {
        setIsFollow(0);
        const currUserRef = doc(db, "users", props.currUser);
        await updateDoc(props.docRef, {
            followers: increment(-1),
        });
        await updateDoc(currUserRef, {
            following: increment(-1),
            followingID: arrayRemove(props.user.id),
        });
    }
    if (isFollow === 0) {
        return(<View>
            <Button title = {"Follow"} onPress = {follow}/>
        </View>);
    } // 
    else {
        return (<Button title = {"Unfollow"} onPress = {unfollow}/>);
    }
}

export default FollowUnfollow;