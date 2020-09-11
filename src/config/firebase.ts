import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDEuwssH0PSsk0KiMvkDdDacBkFllV8MXA",
  authDomain: "app-x-check.firebaseapp.com",
  databaseURL: "https://app-x-check.firebaseio.com",
  projectId: "app-x-check",
  storageBucket: "app-x-check.appspot.com",
  messagingSenderId: "374080355837",
  appId: "1:374080355837:web:adf558906d19174084ed94"
};


firebase.initializeApp(config);
firebase.firestore();
export default firebase;
