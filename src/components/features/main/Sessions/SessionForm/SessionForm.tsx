import React, { useEffect } from 'react';
import { Button, Divider, Drawer, Form, Input, Select, Switch, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SessionToolbarState } from '../SessionToolbar/SessionToolbar';
import { closeSessionForm } from '../SessionsReducer';
import styles from './SessionForm.module.scss';
import { InputNumber } from 'antd/es';
import { QuestionCircleOutlined } from '@ant-design/icons/lib';
import { FRIENDLY_STATUS, SessionStatus } from '../../../../../enum/session-status.enum';
import { SessionsState } from '../Sessions';
import { useFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import firebase from '../../../../../config/firebase';

// todo edit and how to add data to form??
// todo loading/disable while firestore being initializing
// todo delete ONLY if 0 attendees
// todo statuses change order
// todo edit PUBLISHED disabled when > 0 attendees

export default function SessionForm() {
  const firestore = useFirestore();
  const isVisible = useSelector((state: SessionToolbarState) => state.sessions.isFormOpen);
  const currentSession = useSelector((state: SessionToolbarState) => state.sessions.currentSession);
  const dispatch = useDispatch();
  const publishedTasks = useSelector((state: SessionsState) => state.firestore.data.publishedTasks);
  const [form] = Form.useForm();
  const currentUserData = useSelector((state: SessionToolbarState) => state.firebase.profile);
  const currentUserId = useSelector((state: SessionToolbarState) => state.firebase.auth.uid);

  function onClose() {
    console.log(currentSession);
    dispatch(closeSessionForm());
    form.resetFields();
  }

  useEffect(() => {

    if (currentSession) {
      const e = {
        description: 'abc',
        name: '111',
        coefficient: 0.7,
        discardMaxScore: true,
        task: currentSession.task.taskName
      }
      // console.log({
      //   description: currentSession.description
      // });
      form.setFieldsValue({
        ...e
      });
    }
  }, [form, currentSession]);

  function onSubmit(values: any) {
    const valuesForFF = {
      ...values,
      task: {
        taskId: values.task as string,
        taskName: publishedTasks[values.task]?.taskName
      },
      createdBy: currentUserId,
      host: {
        photoURL: currentUserData.photoURL,
        displayName: currentUserData.displayName
      },
      attendees: [],
      attendeeIds: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    firestore.collection('sessions').add(valuesForFF)
      .then(() => {
        toast.info('Session has been successfully added');
        form.resetFields();
        dispatch(closeSessionForm());
      })
      .catch((e) => {
        toast.error(e);
        form.resetFields();
        dispatch(closeSessionForm());
      });
  }

  function getModifiedTaskData(): any[] {
    const modifiedData: any[] = [];
    if (publishedTasks) {
      Object.keys(publishedTasks).forEach((el: any) => {
        if (publishedTasks[el]) {
          const values = publishedTasks[el];
          modifiedData.push({
            taskId: el,
            taskName: values?.taskName
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
              <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={form.submit} type="primary">
                Submit
              </Button>
            </div>
          </div>
        }
      >
        <Form layout="vertical"
              form={form}
              onFinish={onSubmit}
              initialValues={{
                minReviewsAmount: 1,
                desiredReviewersAmount: 4,
                coefficient: 0.7,
                discardMinScore: false,
                discardMaxScore: false,
                description: ''
              }}>
          <div className={styles.session__row}>
            <Form.Item
              className={styles.session__item}
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
              className={styles.session__item}
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
              <QuestionCircleOutlined style={{ marginLeft: 8 }}/>
            </Tooltip>
          </Divider>
          <div className={styles.session__setting}>
            <Form.Item style={{ marginRight: 16 }} name="discardMinScore" label="Discard Min Score"
                       valuePropName="checked">
              <Switch defaultChecked={false}/>
            </Form.Item>
            <Form.Item style={{ marginRight: 16 }} name="discardMaxScore" label="Discard Max Score"
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
            <Form.Item style={{ marginRight: 16 }} label="# Min"
                       className={styles['session__settings-item']}>
              <Form.Item name="minReviewsAmount" noStyle>
                <InputNumber min={1} max={10}/>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginRight: 16 }} label="# Optimal">
              <Form.Item name="desiredReviewersAmount" noStyle>
                <InputNumber min={1} max={10}/>
              </Form.Item>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  )
    ;
}
