import React from 'react';
import {Form, Select, Input } from 'antd';
import { TaskHeader } from './TaskHeader';
import { taskStatus } from '../TaskInterface';
import { taskStore } from './taskReducer/taskStore';
import { taskReducerActions } from './taskReducer/actions';

const { Option } = Select;
const { TextArea } = Input;
export const TaskCreateDefault: React.FC = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (): void => {
    form.validateFields()
      .then((values) => {
        alert(JSON.stringify(values,null, 2))
      })
      .catch((errorInfo) => { alert(errorInfo) });
  };

  const onFinish = (values: object) => {
    // alert(`'Success:' ${JSON.stringify(values, null, 2)}`);
    taskStore.dispatch({ type: taskReducerActions.CHANGE })
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = (): void => {
    form.resetFields();
  };


	return (
		<div className='task'>
      <Form
        form={form}
        name="Task Create"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <TaskHeader onReset={onReset} handleSubmit={handleFormSubmit} title='Create Task' />
        <div className='task-status'>
          <div className='task-block--title'>Status</div>
          <Form.Item
            name='state'
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder='Select status' aria-required style={{ width: 120 }} onChange={() => 1}>
              <Option value={taskStatus.DRAFT}>{taskStatus.DRAFT}</Option>
              <Option value={taskStatus.PUBLISHED}>{taskStatus.PUBLISHED}</Option>
              <Option value={taskStatus.ARCHIVED}>{taskStatus.ARCHIVED}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className='task-title'>
          <div className='task-block--title'>Title</div>
          <Form.Item
            name='id'
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input
            placeholder='Type up to 30 characters'
            maxLength={30}
            />
          </Form.Item>
        </div>
        <div className='task-description'>
          <div className='task-block--title'>Description</div>
          <Form.Item
            name='Description'
          >
            <TextArea placeholder='Enter description here' autoSize={{minRows: 2, maxRows: 10}} />
          </Form.Item>
        </div>
      </Form>
		</div>
	);
};
