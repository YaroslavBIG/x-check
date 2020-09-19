import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { taskReducer } from 'components/features/main/Tasks/TaskCreate/taskReducer/taskReducer';
import loginReducer from '../../features/login/loginReducer';
import SessionsReducer from '../../features/main/Sessions/SessionsReducer';


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  taskStore: taskReducer,
  login: loginReducer,
  sessions: SessionsReducer
});

export default rootReducer;
