import {View, Button} from 'react-native';
import React, {useState} from 'react';
import  {arrayUnion, doc,  updateDoc, increment, arrayRemove, getDoc, } from "firebase/firestore";
import {db} from "./Firestore.js";

const FollowUnfollow = (props) => {
    const [isFollow, setIsFollow] = useState(0);

    React.useEffect(() => {
        const initLoad = async () => {
            const docSnap = await getDoc(props.currUser)
            if (docSnap.data().followingID.includes(props.user.id)) {
                setIsFollow(1);
            }
        }
        initLoad();
    }, [])

    const follow = async () => {
        setIsFollow(1);
        await updateDoc(props.docRef, {
            followers: increment(1),
        });
        await updateDoc(props.currUser, {
            following: increment(1),
            followingID: arrayUnion(props.user.id),
        });
    } //Follow the user by incrementing their follower count by one, and add the user being followed to the current user's following array
    const unfollow = async () => {
        setIsFollow(0);
        await updateDoc(props.docRef, {
            followers: increment(-1),
        });
        await updateDoc(props.currUser, {
            following: increment(-1),
            followingID: arrayRemove(props.user.id),
        });
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