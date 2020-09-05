import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import loginReducer from './loginReducer';


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  login: loginReducer
});

export default rootReducer;
