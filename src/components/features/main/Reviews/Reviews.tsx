import React, { ReactText } from 'react';
import React, { useState } from 'react';
import styles from '../Sessions/Sessions.module.scss';
import { Table, Button, Form } from 'antd';
import { AppReviewInterface } from '../../../../interfaces/app-review.interface';
import { columnsRequests } from './reviewTableDefinition';
import ReviewsToolBar from './ReviewsToolBar/ReviewsToolBar';
import ReviewInfo from '../ReviewInfo/ReviewInfo';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewState } from '../../../../interfaces/review-state.interface';
import { useFirestoreConnect } from 'react-redux-firebase';
import { setRowSelection } from './ReviewReducer';

const Reviews = () => {

  const [isVisible, setVisibility] = useState(false);
  const [form] = Form.useForm();


  const handleClose = () => {
    setVisibility(false);
    form.resetFields();
  }

  const dispatch = useDispatch();
  const reviews: any = useSelector((state: ReviewState) => state.firestore.data.reviews)
  useFirestoreConnect([
    { collection: 'reviews' }
  ]);

  function getModifiedData(): AppReviewInterface[] {
    const modifiedData: AppReviewInterface[] = [];
    if (reviews) {
      Object.keys(reviews).forEach((el: string) => {
        if (reviews[el]) {
          const values: any = reviews[el];
          modifiedData.push({
            key: el,
            id: el,
            requestId: values?.requestId,
            author: values.author,
            state: values.state
          });
        }
      });
    }
    return modifiedData;
  }

  const addRowHandler = () => {
  }

  return (
    <div>
      <h1>Reviews</h1>
      <ReviewsToolBar
        addRow={addRowHandler}
      />
      <Button
        className={styles.Requests__btn}
        icon={<EditOutlined />}
        onClick={() => setVisibility(true)}>
        Show review info form
      </Button>
      <ReviewInfo isVisible={isVisible} onClose={handleClose} form={form} />
      <div className={styles.main}>
        <Table columns={columnsRequests} style={{ width: '100%' }}
               dataSource={getModifiedData()}
               pagination={{ pageSize: 10 }}
               rowSelection={{onChange: (selectedRowKeys: ReactText[]) => {
                  dispatch(setRowSelection(selectedRowKeys))
                 }
               }}
        />
      </div>
    </div>
  );
};

export default Reviews;
