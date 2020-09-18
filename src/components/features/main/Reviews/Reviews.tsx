import React, { useEffect, useState } from 'react';
import styles from '../Sessions/Sessions.module.scss';
import { Table } from 'antd';
import { AppReviewInterface } from '../../../../interfaces/app-review.interface';
import firebase from 'firebase';
import { columnsRequests } from './reviewTableDefinition';
import ReviewsToolBar from './ReviewsToolBar/ReviewsToolBar';
import { ReviewStatusEnum } from '../../../../enum/review-status.enum';



const Reviews = () => {

  const [reviews, setReviews] = useState<AppReviewInterface[]>([]);
  const db = firebase.firestore();
  let reviewCounter = 0;

  useEffect(() => {
    db.collection('reviews').get()
      .then((reviews) => {
        let rvs: any[] = [];
        reviews.forEach((r) => {
          rvs.push(Object.assign({}, r.data(), {key: r.data().id + r.data().requestId}));
        })
        setReviews(rvs);
      })

  }, [reviewCounter])

  const addRowHandler = () => {
    const newRow = {
      key: "0007",
    id: "0007",
    requestId: "ddddd",
    author: "Mr.Bean",
    state: ReviewStatusEnum.REJECTED
    }

    db.collection('reviews').add(newRow)
      .then(() => {
        reviewCounter++;
      });
  }

  return (
    <div>
      <h1>Reviews</h1>
      <ReviewsToolBar
        addRow={addRowHandler}
      />
      <div className={styles.main}>
        <Table columns={columnsRequests} style={{ width: '100%' }}
               dataSource={reviews}
               pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Reviews;
