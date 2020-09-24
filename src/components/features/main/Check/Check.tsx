import React, {useState} from 'react';
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
  setGradeValues: (values: any) => void,
  form: any,
  selfGrade: any,
  taskId: string,
  totalPoints: number,
  setTotalPoints: (number: number) => void,
}

interface TasksState {
  firestore: {
    data: {
      tasks: any,
    }
  }
}


const Check = (props: CheckProps) => {
  const { isVisible, hide, setGradeValues, form, taskId, selfGrade, totalPoints, setTotalPoints } = props;
  useFirestoreConnect([{ collection: 'tasks' }]);
  const tasks = useSelector((state : TasksState) => state.firestore.data.tasks);
  const [changedValues, setChangedValues] = useState<Array<string>>([]);

  // if (isVisible)
  // {
  //   setTotalPoints(selfGrade.totalPoints);
  // }

  const handleClose = () => {
    hide();
    form.resetFields();
    setTotalPoints(0);
  }

  const onFinish = (values: object) => {
    console.log('Received values ofcheck form: ', values);
    hide();
    addGrade(values);
  };

  const onValuesChange = (changedValuesObject: any, allValues: any) : void => {
    console.log(changedValuesObject, allValues);
    Object.keys(changedValuesObject).forEach(key => {
      if (!key.includes('review')) {
        if (selfGrade[key] !== changedValuesObject[key]) {
          setChangedValues(changedValues.concat([key.slice(12)]));
        }
        else {
          const index = changedValues.indexOf(key.slice(12));
          changedValues.splice(index, 1);
        }
      }
    });
    console.log(changedValues);
    setCurrentValue(allValues);
    form.setFieldsValue(allValues);
    console.log(form.getFieldValue());
  }

  const setCurrentValue = (values: any) => {
    let totalPoints = 0;
    Object.keys(values).forEach((key: string) => {
      if (typeof values[key] === 'number' && key !== 'checkedRequirements' && key !== 'totalPoints') {
        totalPoints += values[key];
      }
    });
    setTotalPoints(totalPoints);
  }

  const addGrade = (values: any) => {
    Object.keys(values).forEach((key: string) => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });

    setGradeValues({
      ...selfGrade,
      ...values,
      checkPoints: totalPoints,
    });
  }

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
        <Form
          name="self-check"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={selfGrade}
          layout="vertical"
        >
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
                      return item.category === category && <CategoryItem item={item} key={item.id} isSelfcheck={false} selfGrade={selfGrade} changedValues={changedValues}/>;
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
