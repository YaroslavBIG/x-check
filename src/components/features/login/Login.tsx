import React from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { socialLoginGithub } from '../../app/firestore/firebaseService';
import { GithubOutlined } from '@ant-design/icons';
import { Logo } from './Logo/Logo';
import styles from './Login.module.scss';
import { APP_VERSION } from '../../../config/version';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Role {
  displayName: string;
}

interface LoginState {
  firestore: {
    status: {
      requesting: {
        roles: boolean;
      }
    },
    data: {
      roles: Role
    }
  }
}

export default function Login() {
  const roles = useSelector((state: LoginState) => state.firestore.data.roles);
  const isLoadingRoles = useSelector((state: LoginState) => state.firestore.status.requesting.roles);

  useFirestoreConnect([
    { collection: 'roles' }
  ]);

  const onFinish = async (values: { role: string; displayName: string }) => {
    try {
      await socialLoginGithub('github', values.role, values.displayName);
    } catch (e) {
      toast.error('Failed to Login');
    }
  };

  const onFinishFailed = () => {
    toast.error('Failed to Login');
  };

  return (
    <div className={styles.login__container}>
      <div className={styles.login__logo}>
        <Logo/>
      </div>
      <div className={styles.login__form}>
        <Card title="X-Check App" style={{ width: 300 }}>
          <Form
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="displayName"
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Role is required',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                placeholder='Select a Role'>
                {roles && Object.values(roles).map((el: Role) => el.displayName)
                  .sort()
                  .map((el: string, index: number) => <Select.Option key={index} value={el}>{el}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType="submit"
                disabled={!(roles && Object.values(roles).length)}
                loading={isLoadingRoles}
                icon={<GithubOutlined/>}>
                Login with Github
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <div className={styles.login__version}>
        <span>Version {APP_VERSION}</span>
      </div>
      <ToastContainer position='bottom-right' hideProgressBar/>
    </div>
  );
}
