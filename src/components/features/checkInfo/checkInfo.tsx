import React from 'react';
import { Form, Button, Select, Avatar } from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './checkInfo.scss';

const { Option } = Select;

const CheckInfo = () => {
  return (
    <div className="check-info">
      <Form name="check-info" layout="vertical">
        <div className="check-info__header">
          <h2>Create/edit request</h2>
          <div className="check-info__buttons"> 
            <Button size="large">Cancel</Button>
            <Button htmlType="submit" type="primary" size="large">Save</Button>
          </div>
        </div>
        <ul>
          <li>
            <p className="heading">Task</p>
            <p className="info">Songbird</p>
          </li>
          <li>
            <p className="heading">Cross-check session</p>
            <p className="info">rss2020Q3react-xcheck</p>
          </li>
          <li>
            <p className="heading">Link to pull request</p>
            <p className="info"><a target="_blank" href="https://github.com/pulls">https://github.com/pulls</a></p>
          </li>
          <li>
            <p className="heading">Link to deployed version</p>
            <p className="info"><a target="_blank" href="https://www.netlify.com/">https://me.netlify.app</a></p>
          </li>
          <li>
            <p className="heading">Student</p>
            <div className="info person">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span>Evan Flores</span>
            </div>
          </li>
          <li>
            <p className="heading">Reviewer</p>
            <div className="info person">
              <Avatar icon={<UserOutlined />} />
              <span>Jennie Cooper</span>
            </div>
          </li>
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
          <Select placeholder="Select a status">
            <Option value="draft">Draft</Option>
            <Option value="published">Published</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
        <Button className="check-info-button" size="large">
          <EditOutlined /> Check
        </Button>
      </Form>
    </div>
  );
}

export default CheckInfo;