import React from 'react';
import styles from './TopPanelRequests.module.scss';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, LockOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

const TopPanelRequests = () => {
  return (
    <div className={styles.topPanelRequests__container}>
      <div className={styles.topPanelRequests__crud}>
        <DeleteOutlined className={styles.topPanelRequests__crud__delete} />
        <LockOutlined className={styles.topPanelRequests__crud__lock} />
        <EditOutlined className={styles.topPanelRequests__crud__edit} />
        <Button className={styles.topPanelRequests__crud__btn} type="primary">
          Create
        </Button>
        <InfoCircleOutlined className={styles.topPanelRequests__crud__info} />
      </div>
    </div>
  );
};

export default TopPanelRequests;
