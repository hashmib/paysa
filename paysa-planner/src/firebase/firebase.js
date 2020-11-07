import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBnLBgXhY57BIx_UkCq45e4XRRivXQHq_w",
    authDomain: "paysa-58073.firebaseapp.com",
    databaseURL: "https://paysa-58073.firebaseio.com",
    projectId: "paysa-58073",
    storageBucket: "paysa-58073.appspot.com",
    messagingSenderId: "1065510585280",
    appId: "1:1065510585280:web:82a89e65f99f221817be25",
    measurementId: "G-ER9XHQHR20"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
