import React from 'react';
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
import { Link, Route, Switch } from 'react-router-dom';
import CustomHeader from '../CustomHeader/CustomHeader';
import { Tasks } from '../Tasks/Tasks';
import { Requests } from '../Requests/Requests';
import { Sessions } from '../Sessions/Sessions';
import { Reviews } from '../Reviews/Reviews';
import { Debates } from '../Debates/Debates';
import Logo from '../login/Logo/Logo';
import Login from '../login/Login';
import CheckInfo from '../checkInfo';

const { Header, Sider, Content } = Layout;

const NavigationPanel = (props: any) => {

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={props.collapsed}>
                <div className={!props.collapsed ? "logo" : "logo collapsed"}>
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
                    <Menu.Item key="6" icon={<MessageOutlined/>}>
                        <Link to="/check-info">
                            <span>CheckInfo</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background">
                    {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: props.onToggle,
                    })}
                    <CustomHeader title="Header"/>
                </Header>
                <Content className="site-layout-background">
                    <div>
                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route path="/tasks" component={Tasks}/>
                            <Route path="/requests" component={Requests}/>
                            <Route path="/sessions" component={Sessions}/>
                            <Route path="/reviews" component={Reviews}/>
                            <Route path="/debates" component={Debates}/>
                            <Route path="/check-info" component={CheckInfo}/>
                        </Switch>
                    </div>

                </Content>
            </Layout>
        </Layout>
    );
};

export default NavigationPanel;
