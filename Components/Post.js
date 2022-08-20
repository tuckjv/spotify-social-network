import {Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import  {doc, updateDoc, increment } from "firebase/firestore";
import {db} from "./Firestore.js";
const Post = (props) => {
    const [likes, setLikes] = useState(props.likes); //Use a state variable for likes so the count updates on screen when the user presses like
    const handlePress = async () => {
        setLikes(likes + 1); //Increment the state variable by one so the component re renders with the new count
        const postRef = doc(db, "posts", props.id);
        await updateDoc(postRef, {
            likes: increment(1),
        });
    }//When a user presses the like button, get the post document and increment the number of likes by one

    return(
        <View>
            <Text>{props.text}</Text>
            <Text>{likes}</Text>
            <Text>{props.user}</Text>
            <Text>{props.time}</Text>
            <Button title = {"like"} onPress = {handlePress}/>
        </View>
    ) //Display the text, number of likes, user, and time for each post, as well as the like button
}//Holds post information and displays this information to the user

export default Post;