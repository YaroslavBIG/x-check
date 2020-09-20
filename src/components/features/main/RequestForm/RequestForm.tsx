import React, {useState} from 'react';
import { Drawer, Form, Button, Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import FormHeader from '../FormHeader/FormHeader';
import Selfcheck from '../Selfcheck/Selfcheck';
import 'antd/dist/antd.css';
import './RequestForm.scss';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { toast, ToastContainer } from 'react-toastify';

const { Option } = Select;

interface CollectionsState {
  firestore: {
    data: {
      tasks: any,
      sessions: any,
      requests: any
    }
  }
}

export enum RequestStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  COMPLETED = 'Completed'
}

const RequestForm = (props: any) => {
  const { isVisible, onClose, form} = props;
  const [isSelfcheckVisible, setSelfcheckVisibility] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [selfGradeValues, setselfGradeValues] = useState({checkedRequirements: 0});
  const [selfcheckForm] = Form.useForm();
  const [totalPoints, setTotalPoints] = useState(0);
  const [checkedRequirements, setCheckedRequirements] = useState(0);
  const [isRequired, setRequirement] = useState(false);

  const firestore = useFirestore();
  useFirestoreConnect([ { collection: 'tasks' }, { collection: 'sessions' }, { collection: 'requests' } ]);
  const tasks = useSelector((state : CollectionsState) => state.firestore.data.tasks);
  const sessions = useSelector((state : CollectionsState) => state.firestore.data.sessions);
  const requests = useSelector((state : CollectionsState) => state.firestore.data.requests);

  const addSelfcheck = async () => {
    try {
      await form.validateFields(['taskId']);
      setSelfcheckVisibility(true);
    } catch (errorInfo) {
      toast.error(errorInfo);
    }
  }

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      if ((!isRequired) || (isRequired && taskId && selfGradeValues.checkedRequirements === tasks[taskId].items.length)) {
        console.log('Received values of form: ', values);
        Object.keys(values).forEach((key: string) => {
          if (values[key] === undefined) {
            delete values[key];
          }
        });
        console.log(selfGradeValues);
        selfcheckForm.resetFields();
        setTotalPoints(0);
        setCheckedRequirements(0);
        onClose();
        firestore.collection('requests').add({
          selfGrade: selfGradeValues, 
          task: tasks[taskId].id,
          ...values,
          id: `rev-req-${Object.keys(requests).length + 1}`
        });
        toast.info('Request was successfully send');
      }
      else {
        toast.info("Make sure you checked all requirements");
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      toast.error(errorInfo);
    }
  };

  const handleClose = () => {
    selfcheckForm.resetFields();
    setTotalPoints(0);
    setCheckedRequirements(0);
    onClose();
  }

  const handleStatusChange = (value: string) => {
    if (value === 'PUBLISHED') {
      setRequirement(true);
    }
    else if (isRequired) {
      setRequirement(false);
    }
  }

  return (
    <>
    <Drawer 
      closable={false}
      visible={isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Request" onClose={handleClose} form={form}/>
      }
    >
      <div className="request">
        <Form name="request" layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            style={{marginTop: '1.5rem'}}
            name="taskId"
            label="Task"
            rules={[
              {
                required: true,
                message: 'Please select a task',
              },
            ]}
          >
            <Select placeholder="Select a task" onChange={(value: string) => setTaskId(value)}>
              { tasks && 
                Object.keys(tasks).map((ind: string) => <Option key={ind} value={ind}>{tasks[ind].id}</Option>) 
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
            name="pullRequest"
            label="Link to PR" 
            rules={[
              {
                required: isRequired,
                message: 'Please add link to pull request!',
              },
            ]}
          >
            <Input placeholder="Paste the link" />
          </Form.Item>
          <Form.Item 
            name="deployedVersion"
            label="Link to deployed version" 
            rules={[
              {
                required: isRequired,
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
            <Select placeholder="Select a status" onChange={handleStatusChange}>
              <Option value="DRAFT">{RequestStatus.DRAFT}</Option>
              <Option value="PUBLISHED">{RequestStatus.PUBLISHED}</Option>
              <Option value="COMPLETED">{RequestStatus.COMPLETED}</Option>
            </Select>
          </Form.Item>
          <Button className="self-check-button" size="large" onClick={addSelfcheck} >
            <EditOutlined /> Self-check
          </Button>
        </Form>
      </div>
    </Drawer>
    <Selfcheck 
      taskId={taskId}
      isVisible={isSelfcheckVisible} 
      hide={() => setSelfcheckVisibility(false)} 
      setselfGradeValues={(values: any) => setselfGradeValues(values)}
      form={selfcheckForm}
      totalPoints={totalPoints}
      checkedRequirements={checkedRequirements}
      setTotalPoints={setTotalPoints}
      setCheckedRequirements={setCheckedRequirements}
    />
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
  </>
  );
}

export default RequestForm;