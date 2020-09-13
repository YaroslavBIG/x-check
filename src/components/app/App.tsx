import React from 'react';
import 'antd/dist/antd.css';

// import {Tasks} from "../features/main/Tasks/Tasks";
import { Requests } from '../features/main/Requests/Requests';

const App = () => {
    return (
        <>
            <h1>Come back Project</h1>
            <h1>If you see this label - it mean that test-script.yml <b>work, congratulations with it!</b></h1>
            { /*<Tasks/>*/}
            <Requests />
        </>
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
