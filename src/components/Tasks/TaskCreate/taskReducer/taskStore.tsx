import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'components/app/store/rootReducer';


export const taskStore = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(logger)
  )
)
