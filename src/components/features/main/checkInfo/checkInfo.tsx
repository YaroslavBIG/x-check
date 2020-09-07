import React from 'react';
import { Form, Button, Select, Avatar } from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './checkInfo.module.scss';
import FormHeader from '../formHeader';
import CheckInfoListItem from './listItem/listItem';

const { Option } = Select;

export enum CheckStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  COMPLETED = 'Completed'
}

const CheckInfo = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles['check-info']}>
      <Form name={styles['check-info']} layout="vertical" onFinish={onFinish}>
        <FormHeader title="Create/edit request"/>
        <ul>
          <CheckInfoListItem heading="Task" info="Songbird"/>
          <CheckInfoListItem heading="Cross-check session" info="rss2020Q3react-xcheck"/>
          <CheckInfoListItem heading="Link to pull request">
            <a href="https://github.com/pulls" target="_blank" rel="noopener noreferrer">https://github.com/pulls</a>
          </CheckInfoListItem>
          <CheckInfoListItem heading="Link to deployed version">
            <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">https://me.netlify.app</a>
          </CheckInfoListItem>
          <CheckInfoListItem heading="Student">
            <Avatar className={styles.avatar} icon={<UserOutlined />} />
            <span>Evan Flores</span>
          </CheckInfoListItem>
          <CheckInfoListItem heading="Reviewer">
            <Avatar className={styles.avatar} icon={<UserOutlined />} />
            <span>Jennie Cooper</span>
          </CheckInfoListItem>
        </ul>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: 'Please select a status',
            },
          ]}
        >
          <Select placeholder="Select a status" className={styles.select}>
            <Option value={CheckStatus.DRAFT}>{CheckStatus.DRAFT}</Option>
            <Option value={CheckStatus.PUBLISHED}>{CheckStatus.PUBLISHED}</Option>
            <Option value={CheckStatus.COMPLETED}>{CheckStatus.COMPLETED}</Option>
          </Select>
        </Form.Item>
        <Button className={styles["check-info__button"]} size="large">
          <EditOutlined />Check
        </Button>
      </Form>
    </div>
  );
}

export default CheckInfo;