import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBJVtj2i3cXmziDpI-1G3ndY0tYk_Jioe4",
  authDomain: "todo-app-9aa50.firebaseapp.com",
  databaseURL: "https://todo-app-9aa50.firebaseio.com",
  projectId: "todo-app-9aa50",
  storageBucket: "todo-app-9aa50.appspot.com",
  messagingSenderId: "352285145254",
  appId: "1:352285145254:web:8449658158031f35af1c67",
  measurementId: "G-QV6P3FLVNG"
});

const db = firebaseApp.firestore();

export default db;
