import React from 'react';
import styles from './TopPanelRequests.module.scss';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, LockOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Search } = Input;

const TopPanelRequests = () => {
  return (
    <div className={styles.topPanelRequests__container}>
      <div className={styles.topPanelRequests__search}>
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
      </div>
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
