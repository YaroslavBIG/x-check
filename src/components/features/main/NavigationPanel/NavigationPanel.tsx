import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './NavigationPanel.scss';
import { Layout, Menu } from 'antd';
import {
  AuditOutlined,
  ClusterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SoundOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Link, Switch, Route } from 'react-router-dom';
import CustomHeader from '../CustomHeader/CustomHeader';
import { Tasks } from '../Tasks/Tasks';
import Logo from '../../login/Logo/Logo';
import Reviews from '../Reviews/Reviews';
import { Requests } from '../Requests/Requests';
import { Debates } from '../Debates/Debates';
import { XCheckPath } from '../../../../enum/app-paths.enum';
import Sessions from '../Sessions/Sessions';

const { Header, Sider, Content } = Layout;

interface SelectedTabState {
  login: { defaultPath: string }
}

const NavigationPanel = () => {
  const [status, setStatus] = useState(false);
  // const auth = false; /*useSelector((state: AuthRouteState) => state.firebase.auth);*/
  // const defaultPath: string = useSelector((state: SelectedTabState) => state.login.defaultPath);

  const onToggleHandler = () => {
    setStatus(!status);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={status}>
        <div className={!status ? 'logo' : 'logo collapsed'}>
          <Logo/>
        </div>
        <Menu mode="inline" /*defaultSelectedKeys={[PathMap[defaultPath]]}*/>

          <Menu.Item key="1" icon={<AuditOutlined/>}>
            <Link to={XCheckPath.TASKS}>
              <span>Tasks</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SoundOutlined/>}>
            <Link to={XCheckPath.REQUESTS}>
              <span>Requests</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined/>}>
            <Link to={XCheckPath.SESSIONS}>
              <span>Sessions</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ClusterOutlined/>}>
            <Link to={XCheckPath.REVIEWS}>
              <span>Reviews</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MessageOutlined/>}>
            <Link to={XCheckPath.DEBATES}>
              <span>Debates</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(status ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: onToggleHandler,
          })}
          <CustomHeader/>
        </Header>
        <Content className="site-layout-background">
          <div>
            <Switch>
              <Route exact path="/tasks" component={Tasks}/>
              <Route exact path="/requests" component={Requests}/>
              <Route exact path="/sessions" component={Sessions}/>
              <Route exact path="/reviews" component={Reviews}/>
              <Route exact path="/debates" component={Debates}/>
            </Switch>
            {/*<Switch>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path={XCheckPath.TASKS} component={Tasks}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path={XCheckPath.SESSIONS}
                            component={Sessions}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path={XCheckPath.REQUESTS}
                            component={Requests}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path={XCheckPath.REVIEWS} component={Reviews}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path={XCheckPath.DEBATES} component={Debates}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="*" component={Sessions}
                            exact={false}/>
            </Switch>*/}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavigationPanel;
