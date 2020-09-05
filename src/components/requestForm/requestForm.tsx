import React from 'react';
import { Form, Button, Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './requestForm.scss';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const { Option } = Select;

interface CollectionsState {
  firestore: {
    data: {
      tasksList: any,
      sessions: any
    }
  }
}

const RequestForm = () => {
  useFirestoreConnect([ { collection: 'tasksList' }, { collection: 'sessions' } ]);
  const tasks = useSelector((state : CollectionsState) => state.firestore.data.tasksList);
  const sessions = useSelector((state : CollectionsState) => state.firestore.data.sessions);
  console.log(typeof sessions);
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
            { tasks && 
              Object.keys(tasks).map((ind: any) => <Option key={ind} value={tasks[ind].taskName}>{tasks[ind].taskName}</Option>) 
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="session"
          label="Cross-check session"
          rules={[
            {
              required: true,
              message: 'Please select a cross-check session',
            },
          ]}
          >
            <Select placeholder="Select a cross-check session">
              { sessions && 
                Object.keys(sessions).map((ind: any) => <Option key={ind} value={sessions[ind].name}>{sessions[ind].name}</Option>) 
              }
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
              message: 'Please add link to deployed version!',
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