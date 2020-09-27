import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import styles from './CustomHeader.module.scss';

export interface IProfileState {
  firebase: {
    profile: {
      displayName: string;
      email: string
      photoURL: string;
      role: string
    }
  }
}

const CustomHeader = () => {
  const firebase = useFirebase();
  const profile = useSelector((state: IProfileState) => state.firebase.profile);
  const profileName = useSelector((state: IProfileState) => state.firebase.profile.displayName);

  const menu = (
    <Menu className={styles.profileContainer}>
      <Menu.Item className={styles.name}>
        <div>
          {profile.displayName}
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
          {profile.email}
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
          {profile.role}
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={styles.rs}>
          <a href="https://app.rs.school" target='blank'>Open RS App</a>
        </div>
      </Menu.Item>
      <Menu.Item className={styles.logout}>
        <a href="/" onClick={() => firebase.logout()}>Sign out&nbsp;<LogoutOutlined color='#EB5757' /></a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.header}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div
          className={styles.avatar}
          style={{ backgroundImage: profile.photoURL ? `url(${profile.photoURL})` : '' }}
        >
          {!profile.photoURL && profileName?.slice(0,2)}
        </div>
      </Dropdown>
    </div>
    );
};

export default CustomHeader;
