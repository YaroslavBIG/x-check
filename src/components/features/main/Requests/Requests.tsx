import React, { useState } from 'react';
import styles from './Requests.module.scss';
import './Requests';

import HeaderRequests from './HeaderRequests/HeaderRequests';
import TopPanelRequests from './TopPanelRequests/TopPanelRequests';
import TableRequests from './TableRequests/TableRequests';

import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RequestForm from '../RequestForm/RequestForm';

export const Requests = () => {
  const [isVisible, setVisibility] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
        setVisibility(false);
        form.resetFields();
  }

  return (
    <div className={styles.Requests__container}>
      <HeaderRequests />

      <Button
        className={styles.Requests__btn}
        icon={<EditOutlined />}
        onClick={() => setVisibility(true)}>
        Show request form
      </Button>
      <RequestForm isVisible={isVisible} onClose={handleClose} form={form}/>
      <TopPanelRequests />
      <div>
        <TableRequests />
      </div>
    </div>
  );
};
