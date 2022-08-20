import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button} from 'react-native';
import {db} from '../Components/Firestore.js'
import {doc, collection, addDoc, updateDoc, arrayUnion} from 'firebase/firestore'

const CreatePost = ({route}) => {
    const [post, setPost] = useState("");

    handlePress = async () => {
        const user = route.params.user;
        const time = new Date();
        const docRef = await addDoc(collection(db, "posts"), {
            text: post,
            likes: 0,
            time: time.toDateString(), 
            user: user.data().name
        })
        const userRef = doc(db, "users", user.id);
        const userData = {
            docRefId: docRef.id,
            time: time,
        }
        await updateDoc(userRef, {
            recentPosts: arrayUnion(userData),
        })
    }//When the user presses post, create a new post document, and then add the id of that post to their recent posts

    return(
        <View style = {styles.container}>
            <TextInput placeholder = {"Post here"} onChangeText = {setPost}/>
            <Button title = {"Upload Post"} onPress = {handlePress}/>
        </View>
    ); //Displat a text box and a post button to the user
} //Allows for a user to input the text they want to use for a post

export default CreatePost;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });