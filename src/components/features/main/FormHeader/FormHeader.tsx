import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import styles from './FormHeader.module.scss';

interface FormHeaderProps {
  title: string,
  onClose: () => void
}

const FormHeader = (props: FormHeaderProps) => { 
  return (
    <div className={styles.form__header}>
      <h2 className={styles.form__title}>{props.title}</h2>
      <div className={styles.form__buttons}> 
        <Button size="large" onClick={props.onClose}>Cancel</Button>
        <Button htmlType="submit" type="primary" size="large" onClick={props.onClose}>Save</Button>
      </div>
    </div>
  );
}

export default FormHeader;