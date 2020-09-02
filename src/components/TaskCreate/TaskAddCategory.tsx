import React from 'react';
import { Form, Select, Input } from 'antd';
import { TaskHeader } from './TaskHeader';

export const TaskAddCateory: React.FC = () => {
  const [form] = Form.useForm();
  const Option = Select;

  const onReset = (): void => {
    form.resetFields();
  };

  const handleCatSubmit = () => {
    form.validateFields()
      .then((values) => {
        alert(JSON.stringify(values, null, 2))
      })
      .catch((errorInfo) => { alert(errorInfo) });
  };

  const onFinish = (values: object) => {
    alert(`'Success:' ${JSON.stringify(values, null, 2)}`);
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="task-category">
      <Form
        form={form}
        name="Add Category"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="task-category--header">
          <TaskHeader onReset={onReset} handleSubmit={handleCatSubmit} arrowButton={true} title='Create Task' />
        </div>

        <Form.Item
          name='CatId'
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input
            placeholder='Type category title'
            maxLength={30}
          />
        </Form.Item>
          <Form.Item
              name='Order'
              rules={[{ required: true, message: 'Please select order!' }]}
            >
          <Select placeholder='Select status' aria-required style={{ width: 120 }} onChange={() => 1}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}
