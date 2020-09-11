import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import loginReducer from '../../features/login/loginReducer';
import SessionsReducer from '../../features/main/Sessions/SessionsReducer';


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  login: loginReducer,
  sessions: SessionsReducer
});

export default rootReducer;
