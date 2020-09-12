import React from 'react';
import 'antd/dist/antd.css';

import {Tasks} from "../features/main/Tasks/Tasks";
import NavigationPanel from '../features/main/NavigationPanel/NavigationPanel';

const App = () => {
    return (
        <NavigationPanel/>
    )
}

/*export interface AuthRouteState {
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
      <ToastContainer position='bottom-right' hideProgressBar/>
    </>
  );
};*/

export default App;
