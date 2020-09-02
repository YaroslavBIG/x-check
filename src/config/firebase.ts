import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyB7KOWyP8-pqjo-5stbSfdNjeVLJ20Sz2Y',
  authDomain: 'x-check-app.firebaseapp.com',
  databaseURL: 'https://x-check-app.firebaseio.com',
  projectId: 'x-check-app',
  storageBucket: 'x-check-app.appspot.com',
  messagingSenderId: '652341252651',
  appId: '1:652341252651:web:e76a07bfbee38da44bd06e'
};


firebase.initializeApp(config);
firebase.firestore();
export default firebase;
