import { StyleSheet, TextInput, View, Button, FlatList, Text} from 'react-native';
import React, { useState, useEffect, componentDidUpdate } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../Components/Firestore.js';
import {Seachbar, Searchbar} from 'react-native-paper';

const Search = ({navigation, route}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonText, setButtonText] = useState("User");
    const [results, setResults] = useState([]);

    handlePress = () => {
        if (buttonText === 'User') {
            setButtonText("Artist");
        }
        else {
            setButtonText("User");
        }
    }

    const handleListPress = (name, id) => {
        const currentUser = route.params.user;
        console.log
        const currentUserRef = route.params.currentUserRef;
        navigation.navigate("UserPage", {name: name, id: id, currUser: currentUser, currentUserRef: currentUserRef});
    }

    const doUserQuery = async(searchTerm) => {
        if (searchTerm === "") {
            return;
        }
        const cRef = collection(db, "users");
        const collectionRef = query(cRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
        const querySnapshot = await getDocs(collectionRef);
        var res = [];
        var i = 0;
        querySnapshot.forEach((doc) => {
            res.push(
            {title: doc.data().name, 
            id: doc.id})
        i += 1});
        setResults(res);
    }

    React.useEffect(() => {
            if (buttonText === 'User') {
                doUserQuery(searchTerm);
            }
            else {

            }
    }, [searchTerm])

    const Item = ({ title, id }) => (
        <View style={styles.item}>
          <Button style={styles.title} title = {title} onPress = {() => handleListPress(title, id)}></Button>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item title={item.title} id = {item.id}/>
    );

    return (
        <View style = {styles.container}>
            <Button title = {buttonText} onPress = {handlePress}/>
            <Searchbar placeholder = "Search" onChangeText = {setSearchTerm} value = {searchTerm}/>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
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