import { StyleSheet, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../Components/Firestore.js';
import {Searchbar} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = ({navigation, route}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const handleListPress = (name, id) => {
        const currentUser = route.params.user;
        const currentUserRef = route.params.userRef;
        navigation.navigate("UserPage", {name: name, id: id, currUser: currentUser, currentUserRef: currentUserRef});
    } //When the user clicks on a list item, navigate to the user page for the user they clicked on

    const doUserQuery = async(searchTerm) => {
        if (searchTerm === "") {
            return;
        } //If the user has not entered any text, do nothing
        const cRef = collection(db, "users");
        const collectionRef = query(cRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
        const querySnapshot = await getDocs(collectionRef);
        var res = [];
        var i = 0;
        querySnapshot.forEach((doc) => {
            res.push(
            {title: doc.data().name, 
            id: doc.id})
        i += 1}); //Push each result to the result array, only store the username and document id
        setResults(res);
    } //Show search results by finding all usernames wich are greater than our equal to what the user has entered, and less than the maximum

    React.useEffect(() => {
        doUserQuery(searchTerm);
    }, [searchTerm]) //Do a user query every time that the search term is updated

    const Item = ({ title, id }) => (
        <View style={styles.item}>
          <Button style={styles.title} title = {title} onPress = {() => handleListPress(title, id)}></Button>
        </View>
      ); //Make each list item a button, when pressed it will navigate to the user page

    const renderItem = ({ item }) => (
        <Item title={item.title} id = {item.id}/>
    ); //Pass the item title and id to the item object

    return (
        <SafeAreaView style = {styles.container}>
            <Searchbar placeholder = "Search" onChangeText = {setSearchTerm} value = {searchTerm}/>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    ); //Display the flatlist
}

export default Search;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });