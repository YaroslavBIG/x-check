import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';
import 'react-toastify/dist/ReactToastify.min.css';
import 'antd/dist/antd.css';
import './index.scss';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {Provider} from 'react-redux';
import {createFirestoreInstance} from 'redux-firestore';
import {configureStore} from './components/app/store/configureStore';

const store = configureStore();

/*import {configureStore} from './components/app/store/configureStore';
import {createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {Provider} from 'react-redux';*/

/*const store = configureStore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}*/

const config = {
    apiKey: "AIzaSyDEuwssH0PSsk0KiMvkDdDacBkFllV8MXA",
    authDomain: "app-x-check.firebaseapp.com",
    databaseURL: "https://app-x-check.firebaseio.com",
    projectId: "app-x-check",
    storageBucket: "app-x-check.appspot.com",
    messagingSenderId: "374080355837",
    appId: "1:374080355837:web:adf558906d19174084ed94"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

firebase.initializeApp(config);
firebase.firestore();

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
    document.getElementById('root')
);
