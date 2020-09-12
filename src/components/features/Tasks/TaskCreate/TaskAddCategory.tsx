import React, { useContext } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { TaskHeader } from './TaskHeader';
import { TaskContext } from './TaskContext';
import { Itask, ItaskCategoryValues } from '../TaskInterface';
import { insertToArrayByIndex } from 'utils/insertToArrayByIndex';


export const TaskAddCateory: React.FC = (props) => {
  const [form] = Form.useForm();
  const { setNewTask, addTaskToggler} = useContext(TaskContext);

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

  const onFinish = (values: ItaskCategoryValues) => {
    // alert(`'Success:' ${JSON.stringify(values, null, 2)}`);
    setNewTask((prev: Itask) => (
      {
        ...prev,
        categoriesOrder: insertToArrayByIndex(prev.categoriesOrder, values.order - 1, values.name)
      }
    ))
    addTaskToggler();
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
          name='name'
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input
            placeholder='Type category title'
            maxLength={30}
          />
        </Form.Item>
          <Form.Item
              name='order'
              rules={[{ required: true, message: 'Please select order!' }]}
              initialValue={1}
            >
          <InputNumber min={1} max={100}  onChange={() => null} />
        </Form.Item>
      </Form>
    </div>
  )
}
