import React from 'react';

interface IProfileState {
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
  /*const firebase = useFirebase();
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
          **{profile.role}
        </div>
      </Menu.Item>
      <Menu.Item className={styles.name}>
        <a href="/" onClick={() => firebase.logout()}>Sign out</a>
      </Menu.Item>
    </Menu>
  );*/

  return (
    <div>Header</div>
    /*<div className={styles.header}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div
          className={styles.avatar}
          style={{ backgroundImage: profile.photoURL ? `url(${profile.photoURL})` : '' }}
        >
          {!profile.photoURL && profileName?.slice(0,2)}
        </div>
      </Dropdown>
    </div>*/
    );
};

export default CustomHeader;
