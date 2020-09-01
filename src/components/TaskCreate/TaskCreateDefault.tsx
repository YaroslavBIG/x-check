import React from 'react';
import {Form, Button, Select, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
export const TaskCreateDefault = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields()
      .then((values) => {
        alert(JSON.stringify(values,null, 2))
      })
      .catch((errorInfo) => { alert(errorInfo) });
  };
	enum taskStatus {
		DRAFT = 'Draft',
		PUBLISHED = 'Published',
		ARCHIVED = 'Archived'
	}
	return (
		<div className='task'>
      <Form form={form}>
        <div className='task-header'>
          <div className='task-block--title'>Create Task</div>
          <Button type='primary' size='middle'>
            Cancel
          </Button>
          <Button type='default' size='middle' htmlType="submit" onSubmit={handleFormSubmit}>
            Save
          </Button>
        </div>
        <div className='task-status'>
          <div className='task-block--title'>Status</div>
          <Form.Item
            name='Status'
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
            name='Title'
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
          <Form.Item>
            <TextArea placeholder='Enter description here' autoSize={{minRows: 2, maxRows: 10}} />
          </Form.Item>
        </div>
      </Form>
      <div className="task-add-category">
        <Button type='default' size='middle' > Add category </Button>
      </div>
		</div>
	);
};
