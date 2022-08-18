import {Text, View, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import  {collection, doc, setDoc, updateDoc, getDoc, increment } from "firebase/firestore";
import {db} from "./Firestore.js";
const Post = (props, {navigation}) => {
    const [likes, setLikes] = useState(props.likes);
    const [docRef, setDocRef] = useState("");
    const handlePress = async () => {
        setLikes(likes + 1);
        console.log(props.id);
        const postRef = doc(db, "posts", props.id);
        await updateDoc(postRef, {
            likes: increment(1),
        });
    }

    return(
        <View>
            <Text>{props.text}</Text>
            <Text>{likes}</Text>
            <Text>{props.user}</Text>
            <Text>{props.time}</Text>
            <Button title = {"like"} onPress = {handlePress}/>
        </View>
    )
}

export default Post;