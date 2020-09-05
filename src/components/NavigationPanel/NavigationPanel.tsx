import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './NavigationPanel.scss';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UsergroupAddOutlined,
    SoundOutlined,
    ClusterOutlined,
    AuditOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Tasks from '../Tasks/Tasks';
import Requests from '../Requests/Requests';
import Sessions from '../Sessions/Sessions';
import Reviews from '../Reviews/Reviews';
import Debates from '../Debates/Debates';
import CustomHeader from '../CustomHeader/CustomHeader';

const { Header, Sider, Content } = Layout;

class NavigationPanel extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu mode="inline" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1" icon={<AuditOutlined />}>
                            <Link to="/tasks">
                                <span>Tasks</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<SoundOutlined />}>
                            <Link to="/requests">
                                <span>Requests</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
                            <Link to="/sessions">
                                <span>Sessions</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ClusterOutlined />}>
                            <Link to="/reviews">
                                <span>Reviews</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<MessageOutlined />}>
                            <Link to="/debates">
                                <span>Debates</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background">
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <CustomHeader title="Header" />
                    </Header>
                    <Content className="site-layout-background">
                        <div>
                            <Switch>
                                <Route path = "/tasks" component={Tasks}/>
                                <Route path = "/requests" component={Requests}/>
                                <Route path = "/sessions" component={Sessions}/>
                                <Route path = "/reviews" component={Reviews}/>
                                <Route path = "/debates" component={Debates}/>
                                <Redirect from ='/' to='/tasks'/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default NavigationPanel;
