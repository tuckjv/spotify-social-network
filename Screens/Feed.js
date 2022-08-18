import { StyleSheet, TextInput, View, Button, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidUpdate } from 'react';
import {getDoc, doc, setDoc, collection, addDoc, get, updateDoc, arrayUnion, Timestamp,} from 'firebase/firestore'
import {db} from '../Components/Firestore.js';
import Post from '../Components/Post'
import { FlatList } from 'react-native-gesture-handler';

const Feed = ({ navigation, route }) => {
  const [posts, setPosts] = useState(route.params.posts);
  const [postData, setPostData] = useState(route.params.postData);
  const [moreToLoad, setMoreToLoad] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [postsPos, setPostsPos] = useState(10);
  const [ready, setReady] = useState(0);
  const [end, setEnd] = useState(0);
  
  const loadPosts = async () => {
    console.log(postData.length)
    let newCount = 0;
    let newPosts = [];
    while (postsPos < postData.length && newCount < 10) {
      const postRef = doc(db, "posts", postData[postsPos + newCount].docRefId);
      const postSnap = await getDoc(postRef);
      newPosts.push(postSnap);
      newCount += 1;
      if (postsPos + newCount == postData.length) {
        setMoreToLoad(false);
        break;
      }
    }
    setPostsPos(postsPos + newCount)
    setPosts((p) => {
      return p.concat(newPosts);
    });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data = {posts}
        renderItem = {(item) => {
        return(<Post key = {item.id} 
        text = {item.item.data().text} 
        likes = {item.item.data().likes} 
        time = {item.item.data().time}
        id = {item.item.id}
        user = {item.item.data().user}/>)}}
        onEndReached = {moreToLoad ? loadPosts : null}
        onEndReachedThreshold = {0}
        initialNumToRender = {10}
        keyExtractor = {item => item.id}/>
        <Button title = 'search' onPress = {() => {navigation.navigate("Search")}}/>
        <Button title = "Post" onPress = {() => navigation.navigate("CreatePost")}></Button>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

export default Feed;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });