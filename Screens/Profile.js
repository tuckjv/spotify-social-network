import React, { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { StyleSheet, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  DisplayFavArtists  from '../Components/DisplayFavArtists.js';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const  ProfileScreen = ({ route }) => {
  const [access_token, setAccess_token] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [favArtist, setFavArtist] = useState([]);
  const [arrayIsValid, setArrayIsValid] = useState(0);
    const [request, response, promptAsync] = useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId: '51e40babeeaa42a5881b977574140c7d',
        scopes: ['user-read-email', 'playlist-modify-public', 'user-top-read'],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: "exp://localhost:19000",
      },
      discovery
    ); //Authorize the user's Spotify credentials

    React.useEffect(() => {
      if (response?.type === 'success') {
        setAccess_token(response.params);
        setIsLoggedIn(1);
        }
    }, [response]); //If the login is a success, update the user's logged in status

    React.useEffect(() => {
      if (isLoggedIn === 1) {
        axios({
          method: 'get',
          url: "https://api.spotify.com/v1/me/top/artists",
          headers: {
              'Authorization': 'Bearer ' + access_token['access_token'],
          }
        }).then((response) => setFavArtist([response.data.items[0]['name'], response.data.items[1]['name'], response.data.items[2]['name'], response.data.items[3]['name'], response.data.items[4]['name']])).then(setArrayIsValid(1));
      }
    }) //When the user logs in to their Spotify account, send a get request to obtain their favorite artists
    id = route.params.user;
    return (
        
      <View style={styles.container}>
        <Button
        disabled={isLoggedIn !== 0}
        title="Connect Spotify Account"
        onPress={() => {
          promptAsync();
          }}
        />
        <DisplayFavArtists favArt = {favArtist} arv = {arrayIsValid} id = {id}/>
        <StatusBar style="auto" />
        <Button title = {"Log out"} onPress = {() => {route.params.logOut()}}/>
      </View>
    ); //Display the logout and connect spostify buttons to the user. If they have connected their spotify display their favorite artists
} //User Profile Screen which allows for connecting to your Spotify account

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });