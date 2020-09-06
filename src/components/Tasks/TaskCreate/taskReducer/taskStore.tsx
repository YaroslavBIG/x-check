import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer } from './taskReducer';


export const taskStore = createStore(
  taskReducer,
  composeWithDevTools(
  applyMiddleware(logger)
  )
)
