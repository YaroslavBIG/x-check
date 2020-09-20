import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';
import styles from "./ReviewsToolBar.module.scss"


export default function ReviewsToolBar(props: any) {

  return (
    <div className={styles.container}>
      <Button type='primary' icon={<PlusOutlined/>}
              className={styles.button} onClick={props.addRow}>Add</Button>
      <Button icon={<DeleteOutlined/>} className={styles.button}
              >Delete</Button>
    </div>
  );
}
