import { createStackNavigator } from '@react-navigation/stack';
import Feed from './Feed.js';
import CreatePost from './CreatePost.js';
import Search from './Search.js';
import UserPage from './UserPage.js';
import React, { useState, useEffect, componentDidUpdate } from 'react';
import {db} from '../Components/Firestore.js';
import {getDoc, doc, setDoc} from 'firebase/firestore';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Post from '../Components/Post'

const Stack = createStackNavigator()

const MainScreen = ({route}) => {

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsSet, setPostsSet] = useState(0);
  const [postData, setPostData] = useState([])

  const readUserDoc = async () => {
    const docRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(docRef);
    setUserDoc(userSnap);
  } //After the user creates an account or logs in, get their data so it can be
  //Used throughout the rest of the application

  React.useEffect(() => {
    const func = async () => {
      let posts1 = []
      let posts2 = []
      const userId = route.params.user;
      console.log(userId);
      const currentUserRef = doc(db, "users", userId);
      const userSnap = await getDoc(currentUserRef);
      for (var i = 0; i < userSnap.data().followingID.length; i += 1) {
        const followingRef = doc(db, "users", userSnap.data().followingID[i]);
        const followingSnap = await getDoc(followingRef);
        for (var j = 0; j < followingSnap.data().recentPosts.length; j += 1) {
          posts1.push(followingSnap.data().recentPosts[j]);
        }
      }
      posts1.sort(function(x, y){
        return y.time - x.time;
      });
      for (let i = 0; i < 10; ++i) {
        const postRef = doc(db, "posts", posts1[i].docRefId);
        const postSnap = await getDoc(postRef);
        posts2.push(postSnap)
      }
      setUser(userSnap);
      setPostData(posts1);
      setPosts(posts2);
      setPostsSet(1);
    }
    func();
  }, [])

  if (postsSet == 1) {
    return(
      <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "feed" component = {Feed} initialParams = {{user: user, posts: posts, postData: postData}}/>
        <Stack.Screen name = "CreatePost" component = {CreatePost} initialParams = {{user: user}}/>
        <Stack.Screen name = "Search" component = {Search} initialParams = {{user: user}}/>
        <Stack.Screen name = "UserPage" component = {UserPage} initialParams = {{user: user}}/>
        <Stack.Screen name = "post" component = {Post}/>
      </Stack.Navigator>
    );
  }
  else {
    return (<ActivityIndicator style = {styles.container} animating = {true}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;