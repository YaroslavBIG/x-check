import React, {useState} from 'react';
import { Drawer, Form, Button, Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import FormHeader from '../FormHeader/FormHeader';
import Selfcheck from '../Selfcheck/Selfcheck';
import 'antd/dist/antd.css';
import './RequestForm.scss';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const { Option } = Select;

interface CollectionsState {
  firestore: {
    data: {
      tasks: any,
      sessions: any
    }
  }
}

const RequestForm = (props: any) => {
  const [isSelfcheckVisible, setSelfcheckVisibility] = useState(false);

  const addSelfcheck = async () => {
    try {
      const values = await props.form.validateFields();
      setSelfcheckVisibility(true);
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const [selfcheckForm] = Form.useForm();

  useFirestoreConnect([ { collection: 'tasks' }, { collection: 'sessions' } ]);
  const tasks = useSelector((state : CollectionsState) => state.firestore.data.tasks);
  const sessions = useSelector((state : CollectionsState) => state.firestore.data.sessions);

  return (
    <>
    <Drawer 
      closable={false}
      visible={props.isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Request" onClose={props.onClose} form={props.form}/>
      }
    >
      <div className="request">
        <Form name="request" layout="vertical" form={props.form}>
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
                Object.keys(tasks).map((ind: any) => <Option key={ind} value={tasks[ind].id}>{tasks[ind].id}</Option>) 
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="session"
            label="Cross-check session"
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
                required: false,
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
                required: false,
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
                required: false,
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
          <Button className="self-check-button" size="large" onClick={addSelfcheck} >
            <EditOutlined /> Self-check
          </Button>
        </Form>
      </div>
    </Drawer>
    <Selfcheck 
      isVisible={isSelfcheckVisible} 
      hide={() => setSelfcheckVisibility(false)} 
      form={selfcheckForm} 
    />
  </>
  );
}

export default RequestForm;