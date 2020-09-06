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
import { Link, Switch } from 'react-router-dom';
import CustomHeader from '../CustomHeader/CustomHeader';
import { Tasks } from '../Tasks/Tasks';
import Logo from '../../login/Logo/Logo';
import Sessions from '../Sessions/Sessions';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { AuthRouteState } from '../../../app/App';
import PrivateRoute from '../../../app/PrivateRoute';
import { Reviews } from '../Reviews/Reviews';
import { Requests } from '../Requests/Requests';
import { Debates } from '../Debates/Debates';

const { Header, Sider, Content } = Layout;

const NavigationPanel = () => {
  const [status, setStatus] = useState(false);
  const auth = useSelector((state: AuthRouteState) => state.firebase.auth);

  const onToggleHandler = () => {
    setStatus(!status);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={status}>
        <div className={!status ? 'logo' : 'logo collapsed'}>
          <Logo/>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>

          <Menu.Item key="1" icon={<AuditOutlined/>}>
            <Link to="/tasks">
              <span>Tasks</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SoundOutlined/>}>
            <Link to="/requests">
              <span>Requests</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined/>}>
            <Link to="/sessions">
              <span>Sessions</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ClusterOutlined/>}>
            <Link to="/reviews">
              <span>Reviews</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MessageOutlined/>}>
            <Link to="/debates">
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
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="/tasks" component={Tasks}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="/sessions" component={Sessions}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="/requests" component={Requests}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="/reviews" component={Reviews}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="/debates" component={Debates}
                            exact/>
              <PrivateRoute isAuth={isLoaded(auth) && !isEmpty(auth)} path="*" component={Sessions}
                            exact={false}/>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavigationPanel;
