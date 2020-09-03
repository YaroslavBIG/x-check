import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { taskReducer } from 'components/Tasks/TaskCreate/taskReducer/taskReducer';


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  taskReducer: taskReducer
});

export default rootReducer;
