import React, {useState} from 'react';
import { Drawer, Form, Button, Select, Avatar } from 'antd';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from '../CheckInfo/CheckInfo.module.scss';
import FormHeader from '../FormHeader/FormHeader';
import CheckInfoListItem from '../CheckInfo/CheckInfoListItem/CheckInfoListItem';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { FormInstance } from 'antd/lib/form';
import  Review from './Review';

const { Option } = Select;

export enum ReviewStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  DISPUTED = 'Disputed',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

interface ReviewInfoProps {
  isVisible: boolean,
  onClose: () => void,
  form: FormInstance
}

const ReviewInfo = (props: ReviewInfoProps) => {
  const [reviewForm] = Form.useForm();
  const [isReviewVisible, setReviewVisibility] = useState(false);

  useFirestoreConnect([ { collection: 'reviews' }, { collection: 'tasks' } ]);
  const reviews = useSelector((state : any) => state.firestore.data.reviews);
  const tasks = useSelector((state : any) => state.firestore.data.tasks);
  const key = 'maNNt4axYJtF6nzwBvHI';

  const handleClose = () => {
    // reviewForm.resetFields();
    props.onClose();
  }

  const showReview = () => {
    setReviewVisibility(true);
  }

  return (
    <>
      <Drawer
        closable={false}
        visible={props.isVisible}
        placement='left'
        width={600}
        title={
          <FormHeader title="Review Info" onClose={handleClose} form={props.form}/>
        }
      >
         <Form name={styles['check-info']} layout="vertical" form={props.form} /*onFinish={onFinish}*/>
         <div className={styles['check-info']}>
             <ul>
              <CheckInfoListItem heading="Task" info={reviews && tasks && tasks[reviews[key].task].id}/>
              <CheckInfoListItem heading="Cross-check session" info={reviews && reviews[key].session}/>
              <CheckInfoListItem
                heading="Check points"
                info={reviews && tasks && `${reviews[key].grade.checkPoints}/${tasks[reviews[key].task].maxScore}`}
              />
              <CheckInfoListItem
                heading="Self-check points"
                info={reviews && tasks && `${reviews[key].grade.totalPoints}/${tasks[reviews[key].task].maxScore}`}
              />
              <CheckInfoListItem heading="Student">
                <Avatar className={styles.avatar}
                  src={reviews && (reviews[key].studentPhoto || '')}
                  icon={reviews && !reviews[key].studentPhoto && <UserOutlined />}
                />
                <span>{reviews && reviews[key].student}</span>
              </CheckInfoListItem>
              <CheckInfoListItem heading="Reviewer">
                <Avatar className={styles.avatar}
                  src={reviews && (reviews[key].photo || '')}
                  icon={reviews && !reviews[key].photo && <UserOutlined />}
                />
                <span>{reviews && reviews[key].author}</span>
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
                <Option value="DRAFT">{ReviewStatus.DRAFT}</Option>
                <Option value="PUBLISHED">{ReviewStatus.PUBLISHED}</Option>
                <Option value="COMPLETED">{ReviewStatus.DISPUTED}</Option>
                <Option value="ACCEPTED">{ReviewStatus.ACCEPTED}</Option>
                <Option value="REJECTED">{ReviewStatus.REJECTED}</Option>
              </Select>
            </Form.Item>
            <Button className={styles["check-info__button"]} size="large" onClick={showReview} >
              <EyeOutlined />See review
            </Button>
          </div>
        </Form>
      </Drawer>
      <Review
        isVisible={isReviewVisible}
        hide={() => setReviewVisibility(false)}
        form={reviewForm}
        grade={reviews && reviews[key].grade}
        selfGrade={reviews && reviews[key].selfGrade}
        task={tasks && reviews && tasks[reviews[key].task]}
      />
   </>
  );
}

export default ReviewInfo;
