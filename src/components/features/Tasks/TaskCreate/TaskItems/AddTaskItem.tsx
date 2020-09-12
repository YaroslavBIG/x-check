import React, { useContext } from "react"
import {TaskContext} from '../index';
import { Iitem } from "../../TaskInterface";
import { Form, Input, InputNumber, Checkbox } from "antd";
import { TaskHeader } from "../TaskHeader";

export const AddTaskItem = () => {
  const [form] = Form.useForm();
  const { newTask, setNewItems, collapsePanelNum, collapsPanetId, addItemToggler } = useContext(TaskContext);

  const onReset = (): void => {
    form.resetFields();
  };

  const handleItemSubmit = () => {
    form.validateFields()
      .catch((errorInfo) => { alert(errorInfo) });
  };
  const panelNum = Number(collapsePanelNum)

  const onFinish = (values: Iitem) => {
    setNewItems((prev: Array<Iitem>) => (
        [ ...prev,
          {...values,
            id: collapsPanetId, //.replace(/_\w\d/g, '')}_p${collapsePanelNum}
            category: newTask.categoriesOrder[panelNum]
          }
        ]
      ));
    addItemToggler()
    };
  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="task-item">
      <Form
        form={form}
        layout="vertical"
        name="Add item"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="task-item--header">
          <TaskHeader onReset={onReset} handleSubmit={handleItemSubmit} arrowButton={true} title='Add (Edit Check)' />
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
        <Form.Item name="mentorOnly" valuePropName="checked">
          <Checkbox >Verify by a Mentor only</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
