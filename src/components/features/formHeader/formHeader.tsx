import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './formHeader.scss';

interface FormHeaderProps {
  title: string
}

const FormHeader = (props: FormHeaderProps) => { 
  return (
    <div className="form__header">
      <h2>{props.title}</h2>
      <div className="form__buttons"> 
        <Button size="large">Cancel</Button>
        <Button htmlType="submit" type="primary" size="large">Save</Button>
      </div>
    </div>
  );
}

export default FormHeader;