import React, { useState } from 'react';
import styles from './Requests.module.scss';
import './Requests';

import HeaderRequests from './HeaderRequests/HeaderRequests';
import TopPanelRequests from './TopPanelRequests/TopPanelRequests';
import TableRequests from './TableRequests/TableRequests';

import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CheckInfo from '../CheckInfo/CheckInfo';

export const Requests = () => {
  const [isVisible, setVisibility] = useState(false);
  const [form] = Form.useForm();

  const onClose = () => {
    setVisibility(false);
    form.resetFields();
  };

  return (
    <div className={styles.Requests__container}>
      <HeaderRequests />

      <CheckInfo isVisible={isVisible} onClose={onClose} form={form} />
      <Button
        className={styles.Requests__btn}
        icon={<EditOutlined />}
        onClick={() => setVisibility(true)}>
        Show check info form
      </Button>
      <TopPanelRequests />
      <div>
        <TableRequests />
      </div>
    </div>
  );
};
