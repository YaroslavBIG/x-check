import React from 'react';
import 'antd/dist/antd.css';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
import Login from '../features/login/Login';
import { Route } from 'react-router-dom';
import Sessions from '../features/sessions/Sessions';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavigationPanel/>
      <Route path='/sessions' component={Sessions}/>
      <Route exact path='/' component={Login}/>
    </>
  );
};

export default App;
