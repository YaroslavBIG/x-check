import React, { useContext } from "react"
import {TaskContext} from '../index';
import { Itask } from "../../TaskInterface";
import { Form, Input, InputNumber, Button, Checkbox } from "antd";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

export const AddTaskItem = (props: any) => {
  const [form] = Form.useForm();
  const {catId} = props;
  const { newTask, setNewTask } = useContext(TaskContext);

  console.log(catId)
  const onReset = (): void => {
    form.resetFields();
  };

  const handleItemSubmit = () => {
    form.validateFields()
      .then((values) => {
        alert(JSON.stringify(values, null, 2))
      })
      .catch((errorInfo) => { alert(errorInfo) });
  };

  const onFinish = (values: object) => {
    // alert(`'Success:' ${JSON.stringify(values, null, 2)}`);
    setNewTask((prev: Itask) => (
      {
        ...prev,
      }
    ))
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="task-item">
      <h1>{catId}</h1>
      <Form
        form={form}
        layout="vertical"
        name="Add item"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="task-item--header">
          <Button icon={<SaveOutlined />} size='middle' htmlType="submit" onSubmit={handleItemSubmit} />
          <Button htmlType="button" icon={<DeleteOutlined />} size='middle' onClick={onReset} />
        </div>

        <Form.Item
          label='Short Description'
          name='title'
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input
            placeholder='Type short description'
            maxLength={30}
          />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
        >
          <Input
            placeholder='Enter description here'
            maxLength={5000}
          />
        </Form.Item>
        <Form.Item
          label='Order'
          name='order'
          rules={[{ required: true, message: 'Please select order!' }]}
          initialValue={1}
        >
          <InputNumber min={1} max={10} onChange={() => null} />
        </Form.Item>
        <div className="score-change">
        <Form.Item
          label='Min score'
          name='minScore'
          rules={[{ required: false }]}
          initialValue={0}
        >
          <InputNumber min={-100} max={100} onChange={() => null} />
        </Form.Item>
        <Form.Item
          label='Max score'
          name='maxScore'
          rules={[{ required: true, message: 'Please select max score!' }]}
          initialValue={0}
        >
          <InputNumber min={0} max={1000} onChange={() => null} />
        </Form.Item>
        </div>
        <Checkbox >Verify by a Mentor only</Checkbox>
      </Form>
    </div>
  )
}
