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
        doUserQuery(searchTerm);
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
        <SafeAreaView style = {styles.container}>
            <Searchbar placeholder = "Search" onChangeText = {setSearchTerm} value = {searchTerm}/>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
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