import React, { useContext } from "react"
import {TaskContext} from '../index';
import { Itask, Isubitem } from "../../TaskInterface";
import { Form, Input, InputNumber, Checkbox } from "antd";
import { TaskHeader } from "../TaskHeader";
import update from 'immutability-helper';

export const AddTaskItem = () => {
  const [form] = Form.useForm();
  const { setNewTask, collapsePanelNum } = useContext(TaskContext);

  console.log(typeof collapsePanelNum, collapsePanelNum)
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
  const panelNum = Number(collapsePanelNum)

  const onFinish = (values: Isubitem) => {
    setNewTask((prev: Itask) => (

        // ...prev,
        // items: [{
        //   ...prev.items,
      update(prev, {items:
             {$set: {
                [panelNum]: [
                  values
                ]
                }
              }
             })
      // update(prev, {
      //   items:{ $set:
      //     {[panelNum]: { $push: values }}}



      // })

        // items: {...values}
        // }]
      ));
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
