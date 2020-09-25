import React, {useState} from 'react';
import { Drawer, Form, Button, Select, Avatar } from 'antd';
import { EditOutlined,UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './CheckInfo.module.scss';
import FormHeader from '../FormHeader/FormHeader';
import CheckInfoListItem from './CheckInfoListItem/CheckInfoListItem';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { FormInstance } from 'antd/lib/form';
import Check from '../Check/Check';
import { toast } from 'react-toastify';
import { IProfileState } from '../CustomHeader/CustomHeader';

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
  const [gradeValues, setGradeValues] = useState({});
  const [changedValues, setChangedValues] = useState<Array<string>>([]);

  const firestore = useFirestore();
  useFirestoreConnect([ { collection: 'requests' }, { collection: 'reviews' } ]);
  const requests = useSelector((state : any) => state.firestore.data.requests);
  const key = 'rRxw0Q3rh4tHOC2uzgBy';

  const reviews = useSelector((state : any) => state.firestore.data.reviews);
  const profile = useSelector((state: IProfileState) => state.firebase.profile);


  const handleClose = () => {
    checkForm.resetFields();
    setTotalPoints(0);
    setChangedValues([]);
    props.onClose();
  }

  const onFinish = (values: any) => {
    console.log('Received values of check info form: ', values);
    console.log(gradeValues);
    checkForm.resetFields();
    setTotalPoints(0);
    props.onClose();
    firestore.collection('reviews').add({
      grade: gradeValues,
      task: taskId,
      ...values,
      id: `rev-${Object.keys(reviews).length + 1}`,
      requestId: requests[key].id,
      author: profile.displayName
    });
    toast.info('Review was successfully send');
  };

  const addCheck = () => {
    if (!totalPoints) {
      setTotalPoints(requests[key].selfGrade.totalPoints);
    }
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
          <FormHeader title="Review" onClose={handleClose} form={props.form}/>
        }
      >
        <Form name={styles['check-info']} layout="vertical" form={props.form} onFinish={onFinish}>
          <div className={styles['check-info']}>
            <ul>
              <CheckInfoListItem heading="Task" info={requests && requests[key].task}/>
              <CheckInfoListItem heading="Cross-check session" info={requests && requests[key].crossCheckSessionId}/>
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
                <Avatar className={styles.avatar} src={profile.photoURL ? profile.photoURL : ''} icon={!profile.photoURL && <UserOutlined />}/>
                <span>{profile.displayName}</span>
              </CheckInfoListItem>
              <CheckInfoListItem heading="Reviewer">
                <Avatar className={styles.avatar} icon={<UserOutlined />} />
                <span>Jennie Cooper</span>
              </CheckInfoListItem>
            </ul>
            <Form.Item
              name="state"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Please select a status',
                },
              ]}
            >
              <Select placeholder="Select a status" className={styles.select}>
                <Option value="DRAFT">{CheckStatus.DRAFT}</Option>
                <Option value="PUBLISHED">{CheckStatus.PUBLISHED}</Option>
                <Option value="COMPLETED">{CheckStatus.COMPLETED}</Option>
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
        gradeValues={gradeValues}
        setGradeValues={(values: any) => setGradeValues(values)}
        form={checkForm}
        selfGrade={requests && requests[key].selfGrade}
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        changedValues={changedValues}
        setChangedValues={setChangedValues}
      />
   </>
  );
}

export default CheckInfo;
