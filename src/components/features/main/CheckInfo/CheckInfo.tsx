import React from 'react';
import { Drawer, Form, Button, Select, Avatar } from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './CheckInfo.module.scss';
import FormHeader from '../FormHeader/FormHeader';
import CheckInfoListItem from './CheckInfoListItem/CheckInfoListItem';

const { Option } = Select;

export enum CheckStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  COMPLETED = 'Completed'
}

interface CheckInfoProps {
  isVisible: boolean,
  onClose: () => void,
  form: any
}

const CheckInfo = (props: CheckInfoProps) => {
  const onFinish = (values: any) => {
    console.log('Received values: ', values);
  };

  return (
    <Drawer 
      closable={false}
      visible={props.isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Review" onClose={props.onClose}/>
      }
    >
      <Form name={styles['check-info']} layout="vertical" form={props.form} onFinish={onFinish}>
        <div className={styles['check-info']}>
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
        </div>
      </Form>
    </Drawer>
  );
}

export default CheckInfo;