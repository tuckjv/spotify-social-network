import { StyleSheet, Button, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../Components/Firestore.js';
import Post from '../Components/Post'
import { FlatList } from 'react-native-gesture-handler';

const Feed = ({ navigation, route }) => {
  const [posts, setPosts] = useState(route.params.posts); //Array which contains the id for all posts the user could load
  const [postData] = useState(route.params.postData); //Array which contains loaded post that the user can veiw
  const [moreToLoad, setMoreToLoad] = useState(true); //Lets the flatlist know whether or not there are more posts it can load
  const [postsPos, setPostsPos] = useState(10); //Lets the flatlist know where in the posts array to start loading from
  
  const loadPosts = async () => {
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
      }//If there are no more posts to load, update the state to reflect this
    }//Get the document snapshot for each of the ten most recent posts
    setPostsPos(postsPos + newCount) //Update the post position with however many posts have been added
    setPosts((p) => {
      return p.concat(newPosts);
    });
  } //Load the ten most recent posts
  
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
        <Button title = "Post" onPress = {() => navigation.navigate("CreatePost")}/>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } //Displays recent posts from the users which the current user is following, as well as the post and search buttons

export default Feed;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });