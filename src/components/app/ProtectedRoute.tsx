import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  isAuth: boolean;
}> = (props) => {

  return (props.isAuth) ? (<Route path={props.path} exact={props.exact} component={props.component}/>) :
    (<Redirect to="/login"/>);
};
export default PrivateRoute;
