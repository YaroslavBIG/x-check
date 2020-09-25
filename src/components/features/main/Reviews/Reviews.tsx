import React from 'react';
import styles from '../Sessions/Sessions.module.scss';
import { Table } from 'antd';
import { AppReviewInterface } from '../../../../interfaces/app-review.interface';
import { columnsRequests } from './reviewTableDefinition';
import ReviewsToolBar from './ReviewsToolBar/ReviewsToolBar';
import { useSelector } from 'react-redux';
import { ReviewState } from '../../../../interfaces/review-state.interface';
import { useFirestoreConnect } from 'react-redux-firebase';

const Reviews = () => {

  const reviews: any = useSelector((state: ReviewState) => state.firestore.data.reviews)
  useFirestoreConnect([
    { collection: 'reviews' }
  ]);

  function getModifiedData(): AppReviewInterface[] {
    debugger
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
      <div className={styles.main}>
        <Table columns={columnsRequests} style={{ width: '100%' }}
               dataSource={getModifiedData()}
               pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Reviews;
