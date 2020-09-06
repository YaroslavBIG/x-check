import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { taskReducer } from 'components/features/Tasks/TaskCreate/taskReducer/taskReducer';


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  taskStore: taskReducer
});

export default rootReducer;
