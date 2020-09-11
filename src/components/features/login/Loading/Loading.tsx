import React from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <Spin size="large"/>
    </div>
  );
};
