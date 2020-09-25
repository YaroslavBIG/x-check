import React, { useState } from 'react';
import styles from './TopPanelRequests.module.scss';
import { Input, Button, Form } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, LockOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import RequestForm from '../../RequestForm/RequestForm';
const { Search } = Input;

const TopPanelRequests = () => {
  const [isVisible, setVisibility] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    setVisibility(false);
    form.resetFields();
  }

  return (
    <div className={styles.topPanelRequests__container}>
      <div className={styles.topPanelRequests__search}>
        <Search placeholder="Search" onSearch={(value) => alert(value)} style={{ width: 200 }} />
      </div>
      <div className={styles.topPanelRequests__crud}>
        <DeleteOutlined className={styles.topPanelRequests__crud__delete} />
        <LockOutlined className={styles.topPanelRequests__crud__lock} />
        <EditOutlined className={styles.topPanelRequests__crud__edit} />
        <Button className={styles.topPanelRequests__crud__btn}
          onClick={() => setVisibility(true)}
          type="primary">
          Create
        </Button>
        <RequestForm isVisible={isVisible} onClose={handleClose} form={form}/>
        <InfoCircleOutlined className={styles.topPanelRequests__crud__info} />
      </div>
    </div>
  );
};

export default TopPanelRequests;
