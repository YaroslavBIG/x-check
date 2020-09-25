import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultPath } from '../features/login/loginReducer';
import Loading from '../features/login/Loading/Loading';
import Login from '../features/login/Login';
import { XCheckPath } from '../../enum/app-paths.enum';
import { isLoaded } from 'react-redux-firebase';
import NavigationPanel from '../features/main/NavigationPanel/NavigationPanel';
import { setRowSelection } from '../features/main/Sessions/SessionsReducer';
import { ToastContainer } from 'react-toastify';

/*const App = () => {
	return <NavigationPanel />;
};*/

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
      dispatch(setRowSelection([]));
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      {isLoaded(auth) ?
        <>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path='/login' component={Login}/>
            <Route path={'/(.+)'} render={() => (
              <NavigationPanel/>
            )}/>
          </Switch>
        </>
        :
        <Loading/>
      }
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </>
  );
};

export default App;
