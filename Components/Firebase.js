import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC8z4OXEm1NCCH3WF07Yhj408qYkL8zY04",
    authDomain: "music-social-network-f1253.firebaseapp.com",
    projectId: "music-social-network-f1253",
    storageBucket: "music-social-network-f1253.appspot.com",
    messagingSenderId: "1002776017894",
    appId: "1:1002776017894:web:58289993ea40e12acb3427",
    measurementId: "G-D8R2XFLK2R"
};

const app = initializeApp(firebaseConfig);

export { app };

//Initialize instance of firebase