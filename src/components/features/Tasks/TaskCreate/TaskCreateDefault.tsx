import React, { useContext } from 'react';
import {Form, Select, Input } from 'antd';
import { TaskHeader } from './TaskHeader';
import { taskStatus, Itask } from '../TaskInterface';
import { TaskContext } from './TaskContext';
import { TaskAccordion } from './Accordion/TaskAccordion';

const { Option } = Select;
const { TextArea } = Input;
export const TaskCreateDefault: React.FC = () => {
  const [form] = Form.useForm();
  const { newTask, setNewTask } = useContext(TaskContext);

  console.log(newTask);

  const handleFormSubmit = (): void => {
    form.validateFields()
      .then((values) => {
        alert(JSON.stringify(values,null, 2))
      })
      .catch((errorInfo) => { alert(errorInfo) });
  };

  const onFinish = (values: object) => {
    // alert(`'Success:' ${JSON.stringify(values, null, 2)}`);
    // taskStore.dispatch({ type: taskReducerActions.CHANGE })
    setNewTask((prev: Itask) => (
      {
        ...prev,
        ...values
      }
      ))
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
        layout="vertical"
        form={form}
        name="Task Create"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <TaskHeader onReset={onReset} handleSubmit={handleFormSubmit} title='Create Task' />
        <div className='task-status'>
          <Form.Item
            label='Satus'
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
          <Form.Item
            label='Title'
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
          <Form.Item
            label='Description'
            name='description'
          >
            <TextArea placeholder='Enter description here' autoSize={{minRows: 2, maxRows: 10}} />
          </Form.Item>
        </div>
      </Form>
      <div className="accordion">
        {newTask.categoriesOrder.length ? <TaskAccordion /> : null}
      </div>
		</div>
	);
};
