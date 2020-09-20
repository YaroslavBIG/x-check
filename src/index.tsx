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
