import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { TaskHeader } from './TaskHeader';


export const TaskAddCateory: React.FC = (props) => {
  const [form] = Form.useForm();

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
              initialValue={1}
            >
          <InputNumber min={1} max={10}  onChange={(value) => console.log('Order', value)} />
        </Form.Item>
      </Form>
    </div>
  )
}
