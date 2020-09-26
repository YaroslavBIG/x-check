import React from 'react';
import { Drawer, Form, Collapse, Input } from 'antd';
import 'antd/dist/antd.css';
import '../Selfcheck/Selfcheck.scss';
import FormHeader from '../FormHeader/FormHeader';
import CategoryItem, { TaskItem } from '../Selfcheck/CategoryItem';

const { Panel } = Collapse;
const { TextArea } = Input;

interface CheckProps {
  isVisible: boolean,
  hide: () => void,
  form: any,
  grade: any,
  selfGrade: any,
  task: any
}

interface TasksState {
  firestore: {
    data: {
      tasks: any,
    }
  }
}

const Review = (props: CheckProps) => {
  const { isVisible, hide, form, grade, selfGrade, task } = props;

  const handleClose = () => {
    hide();
  }

  const onFinish = (values: object) => {
    hide();
  };

  return (
    <Drawer
      mask={false}
      closable={false}
      visible={isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Review" onClose={handleClose} form={form}/>
    }
    >
    <div className="self-check">
        <Form
          name="self-check"
          form={form}
          onFinish={onFinish}
          initialValues={grade}
          layout="vertical"
        >
          <div className="self-check__current-values">
              <h3>Check points: {isVisible && grade.checkPoints}/{isVisible && task.maxScore}</h3>
              <h3>Self-check points: {isVisible && grade.totalPoints}/{isVisible && task.maxScore}</h3>
          </div>
          <p>{isVisible && task.description}</p>
          <Collapse bordered={false} style={{backgroundColor: 'white'}}>
            {isVisible &&
                task.categoriesOrder.map((category: string) => (
                  <Panel header={category} key={category}>
                    {task.items.map((item: TaskItem, ind: number) => {
                      return item.category === category &&
                      <CategoryItem item={item} key={item.id} isSelfcheck={false} grade={grade} selfGrade={selfGrade}/>;
                    }
                    )}
                  </Panel>
                ))
            }
          </Collapse>
          {grade &&
            <Form.Item
            name="message"
            label="Leave message to reviewer"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea autoSize />
          </Form.Item>
          }
        </Form>
    </div>
    </Drawer>
  );
}

export default Review;
