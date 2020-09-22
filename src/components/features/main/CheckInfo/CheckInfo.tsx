import React, {useState} from 'react';
import { Drawer, Form, Button, Select, Avatar } from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './CheckInfo.module.scss';
import FormHeader from '../FormHeader/FormHeader';
import CheckInfoListItem from './CheckInfoListItem/CheckInfoListItem';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { FormInstance } from 'antd/lib/form';
import Check from '../Check/Check';

const { Option } = Select;

export enum CheckStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  COMPLETED = 'Completed'
}

interface CheckInfoProps {
  isVisible: boolean,
  onClose: () => void,
  form: FormInstance
}

const CheckInfo = (props: CheckInfoProps) => {
  const [checkForm] = Form.useForm();
  const [isCheckVisible, setCheckVisibility] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);

  useFirestoreConnect([ { collection: 'requests' }]);
  const requests = useSelector((state : any) => state.firestore.data.requests);
  const key = 'rRxw0Q3rh4tHOC2uzgBy';

  const onFinish = (values: any) => {
    console.log('Received values: ', values);
  };

  const addCheck = () => {
    setTaskId(requests[key].taskId);
    setCheckVisibility(true);
  }

  return (
    <>
      <Drawer
        closable={false}
        visible={props.isVisible}
        placement='left'
        width={600}
        title={
          <FormHeader title="Review" onClose={props.onClose} form={props.form}/>
        }
      >
        <Form name={styles['check-info']} layout="vertical" form={props.form} onFinish={onFinish}>
          <div className={styles['check-info']}>
            <ul>
              <CheckInfoListItem heading="Task" info={requests && requests[key].task}/>
              <CheckInfoListItem heading="Cross-check session" info={requests && requests[key].session}/>
              <CheckInfoListItem heading="Link to pull request">
                <a href={requests && requests[key].pullRequest} target="_blank" rel="noopener noreferrer">
                  {requests && requests[key].pullRequest}
                </a>
              </CheckInfoListItem>
              <CheckInfoListItem heading="Link to deployed version">
                <a href={requests && requests[key].deployedVersion} target="_blank" rel="noopener noreferrer">
                  {requests && requests[key].deployedVersion}
                  </a>
              </CheckInfoListItem>
              <CheckInfoListItem heading="Student">
                <Avatar className={styles.avatar} icon={<UserOutlined />} />
                <span>Evan Flores</span>
              </CheckInfoListItem>
              <CheckInfoListItem heading="Reviewer">
                <Avatar className={styles.avatar} icon={<UserOutlined />} />
                <span>Jennie Cooper</span>
              </CheckInfoListItem>
            </ul>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Please select a status',
                },
              ]}
            >
              <Select placeholder="Select a status" className={styles.select}>
                <Option value={CheckStatus.DRAFT}>{CheckStatus.DRAFT}</Option>
                <Option value={CheckStatus.PUBLISHED}>{CheckStatus.PUBLISHED}</Option>
                <Option value={CheckStatus.COMPLETED}>{CheckStatus.COMPLETED}</Option>
              </Select>
            </Form.Item>
            <Button className={styles["check-info__button"]} size="large" onClick={addCheck}>
              <EditOutlined />Check
            </Button>
          </div>
        </Form>
      </Drawer>
      <Check
        taskId={taskId}
        isVisible={isCheckVisible}
        hide={() => setCheckVisibility(false)}
        // setselfGradeValues={(values: any) => setselfGradeValues(values)}
        form={checkForm}
        selfGrade={requests && requests[key].selfGrade}
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        // checkedRequirements={checkedRequirements}
        // setCheckedRequirements={setCheckedRequirements}
      />
   </>
  );
}

export default CheckInfo;
