import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultPath } from './store/loginReducer';
import Loading from './Loading';
import Login from '../features/login/Login';
import NavigationPanel from '../features/NavigationPanel/NavigationPanel';
import { XCheckPath } from '../../models/app-paths.enum';
import { isLoaded } from 'react-redux-firebase';

export interface AuthRouteState {
  login: { defaultPath: string },
  firebase: {
    auth: {
      isLoaded: boolean;
      isEmpty: boolean;
    }
  }
}

const App = () => {
  const auth = useSelector((state: AuthRouteState) => state.firebase.auth);
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    let initialPath = location.pathname;
    const possiblePaths = Object.values(XCheckPath) as string[];
    if (initialPath && possiblePaths.includes(initialPath)) {
      dispatch(setDefaultPath(initialPath));
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      {isLoaded(auth) ?
        <>
          <Route exact path="/" component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route path={'/(.+)'} render={() => (
            <NavigationPanel/>
          )}/>
        </>
        :
        <Loading/>
      }
    </>
  );
};

export default App;
