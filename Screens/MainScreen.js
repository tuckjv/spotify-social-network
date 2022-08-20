import { createStackNavigator } from '@react-navigation/stack';
import Feed from './Feed.js';
import CreatePost from './CreatePost.js';
import Search from './Search.js';
import UserPage from './UserPage.js';
import React, { useState } from 'react';
import {db} from '../Components/Firestore.js';
import {getDoc, doc } from 'firebase/firestore';
import { ActivityIndicator, StyleSheet } from "react-native";
import Post from '../Components/Post'

const Stack = createStackNavigator()

const MainScreen = ({route}) => {

  const [user, setUser] = useState(""); //Current user
  const [posts, setPosts] = useState([]); //Stores post ids
  const [postsSet, setPostsSet] = useState(0); //Lets the application know whether it is safe or not to display posts
  const [postData, setPostData] = useState([]) //Stores the data for posts which have loaded
  const [userRef, setUserRef] = useState(""); //Gets the user reference which is needed for searching

  React.useEffect(() => {
    const func = async () => {
      let posts1 = [] //contains post data
      let posts2 = [] //contains post ids
      const userId = route.params.user;
      const currentUserRef = doc(db, "users", userId);
      setUserRef(currentUserRef);
      const userSnap = await getDoc(currentUserRef);
      for (var i = 0; i < userSnap.data().followingID.length; i += 1) {
        const followingRef = doc(db, "users", userSnap.data().followingID[i]);
        const followingSnap = await getDoc(followingRef);
        for (var j = 0; j < followingSnap.data().recentPosts.length; j += 1) {
          posts1.push(followingSnap.data().recentPosts[j]);
        } //Get the recent posts from each user who the current user is following
      } //Get the id's of everyone who the user is following, use this data to retrieve each users recent posts
      posts1.sort(function(x, y){
        return y.time - x.time;
      }); //Sort the posts by how recently they were posted
      for (let i = 0; i < 10; ++i) {
        const postRef = doc(db, "posts", posts1[i].docRefId);
        const postSnap = await getDoc(postRef);
        posts2.push(postSnap)
      }//Load the initial ten posts for the user to see
      setUser(userSnap);
      setPostData(posts1);
      setPosts(posts2);
      setPostsSet(1);
    } //Loads the initial ten posts for the user to see, as well as loading all post ids which the user could potentially view
    func();
  }, [])

  if (postsSet == 1) {
    return(
      <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "feed" component = {Feed} initialParams = {{user: user, posts: posts, postData: postData}}/> 
        <Stack.Screen name = "CreatePost" component = {CreatePost} initialParams = {{user: user}}/>
        <Stack.Screen name = "Search" component = {Search} initialParams = {{user: user, userRef: userRef}}/>
        <Stack.Screen name = "UserPage" component = {UserPage} initialParams = {{user: user}}/>
        <Stack.Screen name = "post" component = {Post}/>
      </Stack.Navigator>
    );
  } //Once the posts have loaded, allows for the user to access all features of the app
  else {
    return (<ActivityIndicator style = {styles.container} animating = {true}/>);
  } //Shows spinning loading icon if the posts have not loaded yet. 
} //Controls the main screen for the app, allows for users to access all features of the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;