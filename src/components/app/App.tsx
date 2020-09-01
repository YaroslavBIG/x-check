import React from 'react';
import Login from '../features/login/Login';
import { Route } from 'react-router-dom';
import Sessions from '../features/sessions/Sessions';

const App = () => {
  return (
    <>
      <Route path='/sessions' component={Sessions}/>
      <Route exact path='/' component={Login}/>
    </>
  );
};

export default App;
