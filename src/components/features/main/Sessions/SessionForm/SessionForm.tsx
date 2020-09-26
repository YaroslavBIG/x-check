import React, { useEffect } from 'react';
import { Button, Divider, Drawer, Form, Input, Select, Switch, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeSessionForm } from '../SessionsReducer';
import styles from './SessionForm.module.scss';
import { InputNumber } from 'antd/es';
import { QuestionCircleOutlined } from '@ant-design/icons/lib';
import { FRIENDLY_STATUS, SessionStatus } from '../../../../../enum/session-status.enum';
import { useFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import firebase from '../../../../../config/firebase';
import { SessionsState } from '../../../../../interfaces/sessions-state.interface';
import { Task } from '../../../../../interfaces/task.interface';
import { FirestoreSessionData } from '../../../../../interfaces/firestore-session.interface';

interface SessionFormData {
  name: string;
  minReviewsAmount: number;
  desiredReviewersAmount: number;
  coefficient: number;
  discardMinScore: boolean;
  discardMaxScore: boolean;
  description: string;
  status: string;
  task: string;
}

const initialFormValues = {
  minReviewsAmount: 1,
  desiredReviewersAmount: 4,
  coefficient: 0.7,
  discardMinScore: false,
  discardMaxScore: false,
  description: '',
};

export default function SessionForm() {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isVisible = useSelector((state: SessionsState) => state.sessions.isFormOpen);
  const currentSession = useSelector((state: SessionsState) => state.sessions.currentSession);
  const publishedTasks = useSelector((state: SessionsState) => state.firestore.data.publishedTasks);
  const currentUserData = useSelector((state: SessionsState) => state.firebase.profile);
  const currentUserId = useSelector((state: SessionsState) => state.firebase.auth.uid);

  function onClose() {
    dispatch(closeSessionForm());
    form.resetFields();
  }

  useEffect(() => {
    if (currentSession) {
      const initialData = {
        ...currentSession,
        task: currentSession.task?.taskId,
        status: currentSession.status as SessionStatus
      };
      form.setFieldsValue({
        ...initialData
      });
    }
  }, [form, currentSession]);

  function onSubmit(values: SessionFormData) {
    let valuesForFirebase = {
      ...values,
      task: {
        taskId: values?.task,
        taskName: publishedTasks[values.task]?.taskName || publishedTasks[values.task]?.description
      }
    };
    if (!currentSession) {
      addNewSession(valuesForFirebase);
    } else {
      updateSession(valuesForFirebase);
    }
  }

  async function addNewSession(valuesForFirebase: Partial<FirestoreSessionData>) {
    let newSessionAttributes = {
      ...valuesForFirebase,
      createdBy: currentUserId,
      host: {
        photoURL: currentUserData.photoURL,
        displayName: currentUserData.displayName
      },
      attendees: [],
      attendeeIds: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    try {
      await firestore.collection('sessions').add(newSessionAttributes);
      form.resetFields();
      dispatch(closeSessionForm());
      toast.info('Session has been successfully added');
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  }

  async function updateSession(valuesForFirebase: Partial<FirestoreSessionData>) {
    try {
      await firestore.update({ collection: 'sessions', doc: currentSession.id }, valuesForFirebase);
      form.resetFields();
      dispatch(closeSessionForm());
      toast.info('Session has been successfully updated');
    } catch (e) {
      toast.error(e);
    }
  }

  function getModifiedTaskData(): Task[] {
    const modifiedData: Task[] = [];
    if (publishedTasks) {
      Object.keys(publishedTasks).forEach((el: string) => {
        if (publishedTasks[el]) {
          const values: any = publishedTasks[el];
          modifiedData.push({
            taskId: el,
            taskName: values?.description || 'no description'
          });
        }
      });
    }
    return modifiedData;
  }

  return (
    <>
      <Drawer
        placement='left'
        closable={false}
        width={'40%'}
        onClose={() => onClose()}
        visible={isVisible}
        title={
          <div className={styles.header}>
            <span className={styles.header__title}>{currentSession ? 'Edit' : 'Create'} Session</span>
            <div>
              <Button onClick={() => onClose()}>
                Cancel
              </Button>
              <Button onClick={form.submit} type="primary" className={styles.session__button}>
                Submit
              </Button>
            </div>
          </div>
        }
      >
        <Form layout="vertical"
              form={form}
              onFinish={onSubmit}
              initialValues={initialFormValues}
        >
          <div className={styles.session__row}>
            <Form.Item
              className={styles.session__section}
              name="task"
              label="Task"
              rules={[{ required: true, message: 'Please choose the task' }]}
            >
              <Select placeholder="Please choose the task">
                {getModifiedTaskData().map((task) =>
                  <Select.Option key={task.taskId} value={task.taskId}>{task.taskName}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.session__section}
              name="status"
              label="Session Status"
              rules={[{ required: true, message: 'Please choose the status' }]}
            >
              <Select placeholder="Please choose the status">
                {Object.values(SessionStatus).map((status, index: number) =>
                  <Select.Option key={index} value={status}>{FRIENDLY_STATUS[status]}</Select.Option>)}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="name"
            label="Session Name"
            rules={[{
              required: true, message: 'Please enter session name',
              max: 250
            }]}
          >
            <Input placeholder="Enter session name"/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                message: 'please enter url description',
                max: 1000
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter session description"/>
          </Form.Item>
          <Divider orientation="left">
            Score Settings
            <Tooltip title="Discard score settings will be applied in case min 3 reviews are available">
              <QuestionCircleOutlined className={styles.session__button}/>
            </Tooltip>
          </Divider>
          <div className={styles.session__setting}>
            <Form.Item className={styles.session__item} name="discardMinScore" label="Discard Min Score"
                       valuePropName="checked">
              <Switch/>
            </Form.Item>
            <Form.Item className={styles.session__item} name="discardMaxScore" label="Discard Max Score"
                       valuePropName="checked">
              <Switch/>
            </Form.Item>
            <Form.Item label="Coefficient">
              <Form.Item name="coefficient" noStyle>
                <InputNumber min={0.1} max={1} step={0.1}/>
              </Form.Item>
            </Form.Item>
          </div>
          <Divider orientation="left">
            Reviews Settings
          </Divider>
          <div className={styles.session__setting}>
            <Form.Item className={styles.session__item} label="# Min">
              <Form.Item name="minReviewsAmount" noStyle>
                <InputNumber min={1} max={10}/>
              </Form.Item>
            </Form.Item>
            <Form.Item className={styles.session__item} label="# Optimal">
              <Form.Item name="desiredReviewersAmount" noStyle>
                <InputNumber min={1} max={10}/>
              </Form.Item>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
}
