import React from 'react';
import { Drawer, Form, Collapse } from 'antd';
import 'antd/dist/antd.css';
import './Selfcheck.scss';
import FormHeader from '../FormHeader/FormHeader';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import CategoryItem, { TaskItem } from './CategoryItem';

const { Panel } = Collapse;

interface SelfcheckProps {
  isVisible: boolean,
  hide: () => void,
  form: any
}

interface TasksState {
  firestore: {
    data: {
      tasks: any,
    }
  }
}

const initialFormValues = {
  values: {}
};

const Selfcheck = (props: SelfcheckProps) => {

  const handleClose = () => {
    props.hide();
    props.form.resetFields();
  }

  const onFinish = (values: object) => {
    console.log('Received values of form: ', values);
    handleClose();
    addSelfGrade(values);
  };

  const onValuesChange = (changedValues: object, allValues: object) : void => {
    console.log(changedValues, allValues);
    props.form.setFieldsValue(allValues);
    console.log(props.form.getFieldValue());
  }

  const addSelfGrade = (values: any) => {
    Object.keys(values).forEach((key: string) => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });
    firestore.collection('selfGrades').add(values);
  }

  const firestore = useFirestore();
  useFirestoreConnect([{ collection: 'tasks' }]);
  const tasks = useSelector((state : TasksState) => state.firestore.data.tasks);

  return (
    <Drawer 
      mask={false}
      closable={false}
      visible={props.isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Self-check" onClose={handleClose} form={props.form}/>
    }
    >
    <div className="self-check">
        <Form name="self-check" form={props.form} onFinish={onFinish} onValuesChange={onValuesChange} initialValues={initialFormValues} >
          <div className="self-check__current-values">
              <h3>Total points: 80/600</h3>
              <h3>Checked requirements: 10/20</h3>
          </div>
          <Collapse bordered={false} style={{backgroundColor: 'white'}}>
            {tasks && 
              Object.keys(tasks).map((ind: string) => {
                return tasks[ind].categoriesOrder.map((category: string) => (
                  <Panel header={category} key={category}>
                    {tasks[ind].items.map((item: TaskItem, ind: number) => item.category === category && <CategoryItem item={item} key={item.id} />)}
                  </Panel>
                ));
              })
            }
          </Collapse>
        </Form>
    </div>
    </Drawer>
  );
}

export default Selfcheck;
