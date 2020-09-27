import React, { ReactText } from 'react';
import styles from '../Sessions/Sessions.module.scss';
import { Table, Form } from 'antd';
import { AppReviewInterface } from '../../../../interfaces/app-review.interface';
import { columnsRequests } from './reviewTableDefinition';
import ReviewsToolBar from './ReviewsToolBar/ReviewsToolBar';
import ReviewInfo from '../ReviewInfo/ReviewInfo';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewState } from '../../../../interfaces/review-state.interface';
import { useFirestoreConnect } from 'react-redux-firebase';
import { closeReviewForm, setRowSelection } from './ReviewReducer';

const Reviews = () => {

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const reviews: any = useSelector((state: ReviewState) => state.firestore.data.reviews)
  const isVisible = useSelector((state: ReviewState) => state.reviews.isFormOpen);
  useFirestoreConnect([
    { collection: 'reviews' }
  ]);

  const handleClose = () => {
    dispatch(closeReviewForm());
    form.resetFields();
  }

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
