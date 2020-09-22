import React from 'react';
import { Drawer, Form, Collapse } from 'antd';
import 'antd/dist/antd.css';
import '../Selfcheck/Selfcheck.scss';
import FormHeader from '../FormHeader/FormHeader';
import { useSelector } from 'react-redux';
import { useFirestoreConnect} from 'react-redux-firebase';
import CategoryItem, { TaskItem } from '../Selfcheck/CategoryItem';

const { Panel } = Collapse;

interface CheckProps {
  isVisible: boolean,
  hide: () => void,
  // setselfGradeValues: (values: any) => void,
  form: any,
  selfGrade: any,
  taskId: string,
  totalPoints: number,
  setTotalPoints: (number: number) => void,
  // checkedRequirements: number,
  // setCheckedRequirements: (number: number) => void,
}

interface TasksState {
  firestore: {
    data: {
      tasks: any,
    }
  }
}


const Check = (props: CheckProps) => {
  const { isVisible, hide/*, setselfGradeValues, */, form, taskId, selfGrade, totalPoints/*, setTotalPoints, checkedRequirements, setCheckedRequirements*/ } = props;
  useFirestoreConnect([{ collection: 'tasks' }]);
  const tasks = useSelector((state : TasksState) => state.firestore.data.tasks);

  const handleClose = () => {
    hide();
    form.resetFields();
    // setTotalPoints(0);
    // setCheckedRequirements(0);
  }

  const onFinish = (values: object) => {
    console.log('Received values of selfcheck form: ', values);
    hide();
    // addSelfGrade(values);
  };

  const onValuesChange = (changedValues: object, allValues: any) : void => {
    console.log(allValues);
    // setCurrentValues(allValues);
    // form.setFieldsValue(allValues);
    // console.log(form.getFieldValue());
  }

  // const setCurrentValues = (values: any) => {
  //   let totalPoints = 0;
  //   let checkedRequirements = 0;
  //   Object.keys(values).forEach((key: string) => {
  //     if (typeof values[key] === 'number') {
  //       totalPoints += values[key];
  //       checkedRequirements++;
  //     }
  //   });
  //   setTotalPoints(totalPoints);
  //   setCheckedRequirements(checkedRequirements);
  // }

  // const addSelfGrade = (values: any) => {
  //   Object.keys(values).forEach((key: string) => {
  //     if (values[key] === undefined) {
  //       delete values[key];
  //     }
  //   });

  //   setselfGradeValues({
  //     ...values,
  //     totalPoints,
  //     checkedRequirements
  //   });
  // }

  return (
    <Drawer
      mask={false}
      closable={false}
      visible={isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Check list" onClose={handleClose} form={form}/>
    }
    >
    <div className="self-check">
        <Form name="self-check" form={form} onFinish={onFinish} onValuesChange={onValuesChange} initialValues={selfGrade} >
          <div className="self-check__current-values">
              <h3>Total points: {totalPoints}/{isVisible && tasks[taskId].maxScore}</h3>
              <h3>Self-check points: {isVisible && selfGrade.totalPoints}/{isVisible && tasks[taskId].maxScore}</h3>
          </div>
          <p>{(tasks && isVisible) && tasks[taskId].description}</p>
          <Collapse bordered={false} style={{backgroundColor: 'white'}}>
            {(tasks && isVisible) &&
                tasks[taskId].categoriesOrder.map((category: string) => (
                  <Panel header={category} key={category}>
                    {tasks[taskId].items.map((item: TaskItem, ind: number) => {
                      return item.category === category && <CategoryItem item={item} key={item.id} isSelfcheck={false} selfGrade={selfGrade}/>;
                    }
                    )}
                  </Panel>
                ))
            }
          </Collapse>
        </Form>
    </div>
    </Drawer>
  );
}

export default Check;
