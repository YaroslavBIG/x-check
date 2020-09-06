import React from 'react';
import { Button } from 'antd';
import styles from './SessionToolbar.module.scss';
import { DeleteOutlined, EditOutlined, InfoOutlined, PlusOutlined } from '@ant-design/icons/lib';

export default function SessionToolbar() {

  return (
    <>
      <Button icon={<EditOutlined/>}>Edit</Button>
      <Button icon={<DeleteOutlined/>} className={styles.button}>Delete</Button>
      <Button type='primary' icon={<PlusOutlined/>}
              className={styles.button}>Add</Button>
      <Button icon={<InfoOutlined/>} size='small' shape='circle'
              className={styles.button}/>
    </>
  );
}
