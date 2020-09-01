import React, { useState } from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { socialLoginGithub } from '../../../app/firestore/firebaseService';
import { toast } from 'react-toastify';
import { GithubOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

interface Role {
  displayName: string;
}

interface LoginState {
  firestore: {
    data: {
      roles: Role
    }
  }
}

export default function LoginForm() {
  const roles = useSelector((state: LoginState) => state.firestore.data.roles);
  const [isPending, setPending] = useState(false);
  const history = useHistory();

  useFirestoreConnect([
    { collection: 'roles' }
  ]);

  const onFinish = async (values: { role: string; displayName: string }) => {
    try {
      setPending(true);
      await socialLoginGithub('github', values.role, values.displayName);
      setPending(false);
      history.push('/sessions');
    } catch (e) {
      setPending(false);
      toast.error('Failed to Login');
    }
  };

  return (
    <>
      <Card title="X-Check App" style={{ width: 300 }}>
        <Form
          name="login"
          onFinish={onFinish}
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
            <Input placeholder="Enter your name"/>
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
              loading={isPending}
              icon={<GithubOutlined/>}>
              Login with Github
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
