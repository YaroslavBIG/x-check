import { createStore } from 'redux';
import { taskReducer } from './taskReducer';

export const taskStore = createStore(taskReducer);
