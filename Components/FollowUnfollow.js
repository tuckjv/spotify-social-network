import {View, Button} from 'react-native';
import React, {useState} from 'react';
import  {arrayUnion, updateDoc, increment, arrayRemove, getDoc, } from "firebase/firestore";

const FollowUnfollow = (props) => {
    const [isFollow, setIsFollow] = useState(0); //0 represents that the user is not following the page they are looking at, 1 represents if they are

    React.useEffect(() => {
        const initLoad = async () => {
            const docSnap = await getDoc(props.currUser);
            if (docSnap.data().followingID.includes(props.user.id)) {
                setIsFollow(1);
            } //Get the current user's document, and check to see if the user they are looking at is in the list of ID's they follow
        } //Create new function and call it since useEffect cannot be asynchronous
        initLoad();
    }, []) //When the user first clicks on someone else's page, check to see if they are already following the user, so that the unfollow button is displayed

    const follow = async () => {
        setIsFollow(1);
        await updateDoc(props.docRef, {
            followers: increment(1),
        }); //Update the follower count of the person that the current user wants to follow by one
        await updateDoc(props.currUser, {
            following: increment(1),
            followingID: arrayUnion(props.user.id),
        }); //Update the current user so they are following one more person, update their followingID array with the new user
    } //Follow the user by incrementing their follower count by one, and add the user being followed to the current user's following array
    const unfollow = async () => {
        setIsFollow(0);
        await updateDoc(props.docRef, {
            followers: increment(-1),
        }); //Decrease the follower count of the person the current user wants to unfollow by one
        await updateDoc(props.currUser, {
            following: increment(-1),
            followingID: arrayRemove(props.user.id),
        }); //Decrease the following count of the current user by one, remove the ID of the person they are unfollowing from their followingID array
    } //Unfollow the user by decrementing the follower count by one, and remove the user being unfollowed from the current user's following array
    if (isFollow === 0) {
        return(<View>
            <Button title = {"Follow"} onPress = {follow}/>
        </View>);
    } //If the current user is not following the profile they are looking at, display the follow button
    else {
        return (<Button title = {"Unfollow"} onPress = {unfollow}/>);
    } //If the current user is following the profile they are looking at, display the unfollow button
} //Handles all operations related to following and unfollowing a user

export default FollowUnfollow;