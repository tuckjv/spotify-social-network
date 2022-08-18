import React, { useState, useEffect, componentDidUpdate } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {db} from '../Components/Firestore.js'
import {getDoc, doc, setDoc, collection, addDoc, get, updateDoc, arrayUnion, Timestamp,} from 'firebase/firestore'

const CreatePost = ({navigation, route}) => {
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
    }

    return(
        <View style = {styles.container}>
            <TextInput placeholder = {"Post here"} onChangeText = {setPost}/>
            <Button title = {"Upload Post"} onPress = {handlePress}/>
        </View>
    );
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });