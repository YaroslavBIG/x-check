import React, { ReactText } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { Button, Modal } from 'antd';
import styles from "./ReviewsToolBar.module.scss"
import { useFirestore } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewState } from '../../../../../interfaces/review-state.interface';
import { toast } from 'react-toastify';
import { openReviewForm } from '../ReviewReducer';

const { confirm } = Modal;

export default function ReviewsToolBar(props: any) {

  const firestore = useFirestore();
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: ReviewState) => state.reviews.rows);

  function showConfirm() {
    confirm({
      title: 'Delete Review',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete the selected review?',
      onOk() {
        deleteSession();
      }
    });
  }

  async function deleteSession() {
    try {
      await selectedRows.forEach((row: ReactText) =>
        firestore.delete({ collection: 'reviews', doc: row as string }),
      );
      toast.info('Sessions successfully removed');
    } catch (e) {
      toast.error(e);
    }
  }

  const addSession = () => {
    dispatch(openReviewForm(null));
  }

  return (
    <div className={styles.container}>
      <Button type='primary'
              icon={<PlusOutlined/>}
              className={styles.button}
              onClick={addSession}
      >Add</Button>
      <Button icon={<DeleteOutlined/>}
              className={styles.button}
              disabled={!selectedRows?.length}
              onClick={showConfirm}>
      Delete</Button>
    </div>
  );
}
