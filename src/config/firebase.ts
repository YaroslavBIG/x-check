import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDPZEfDNzigVDdlq4oPuazwr9sskyHZDPc",
  authDomain: "x-check-b1d40.firebaseapp.com",
  databaseURL: "https://x-check-b1d40.firebaseio.com",
  projectId: "x-check-b1d40",
  storageBucket: "x-check-b1d40.appspot.com",
  messagingSenderId: "746311705587",
  appId: "1:746311705587:web:e11658b6cbfdb4ab8ee886",
};


firebase.initializeApp(config);
firebase.firestore();
export default firebase;
