import React from 'react';
import { Form, Button, Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './requestForm.scss';

const { Option } = Select;

const RequestForm = () => {
  return (
    <div className="request">
      <Form name="request" layout="vertical">
        <div className="request__header">
          <h2>Create/edit request</h2>
          <div className="request__buttons"> 
            <Button size="large">Cancel</Button>
            <Button htmlType="submit" type="primary" size="large">Save</Button>
          </div>
        </div>
        <Form.Item
          style={{marginTop: '1.5rem'}}
          name="task"
          label="Task"
          rules={[
            {
              required: true,
              message: 'Please select a task',
            },
          ]}
        >
          <Select placeholder="Select a task">
            <Option value="xcheck">Xcheck</Option>
            <Option value="songbird">Songbird</Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{marginTop: '1.5rem'}}
          name="session"
          label="Cross-check session"
          rules={[
            {
              required: true,
              message: 'Please select a task',
            },
          ]}
          >
            <Select placeholder="Select a cross-check session">
              <Option value="xcheck">rss2020Q3react-xcheck</Option>
              <Option value="songbird">rss2020Q3react-songbird</Option>
            </Select>
        </Form.Item>
        <Form.Item 
          name="pr"
          label="Link to PR" 
          rules={[
            {
              required: true,
              message: 'Please add link to pull request!',
            },
          ]}
        >
          <Input placeholder="Paste the link" />
        </Form.Item>
        <Form.Item 
          name="deployed"
          label="Link to deployed version" 
          rules={[
            {
              required: true,
              message: 'Please add Link to deployed version!',
            },
          ]}
        >
          <Input placeholder="Paste the link" />
        </Form.Item>
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
          <Select placeholder="Select a status">
            <Option value="draft">Draft</Option>
            <Option value="published">Published</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
        <Button className="self-check-button" size="large">
          <EditOutlined /> Self-check
        </Button>
      </Form>
    </div>
  );
}

export default RequestForm;