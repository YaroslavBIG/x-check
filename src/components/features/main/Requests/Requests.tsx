import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// import CheckInfo from '../CheckInfo/CheckInfo';
import RequestForm from '../RequestForm/RequestForm';

export const Requests = () => {
    // const [isCheckInfoVisible, setCheckInfoVisibility] = useState(false);
    // const [isSelfCheckVisible, setSelfCheckVisibility] = useState(false);
    const [isVisible, setVisibility] = useState(false);
    const [form] = Form.useForm();

    // const handleCheckInfoClose = () => {
    //     setCheckInfoVisibility(false);
    //     form.resetFields();
    // }

    const handleClose = () => {
        setVisibility(false);
        form.resetFields();
    }

    // const handleFormSubmit = () => {
    //     setSelfCheckVisibility(false);
    //     form.resetFields();
    // }

    const handleFormSubmit = () => {
        setVisibility(false);
        form.resetFields();
    }
    return (
        <div>
            <h1>Requests</h1>
            {/* <Button icon={<EditOutlined/>} onClick={() => setCheckInfoVisibility(true)}>Show check info form</Button> */}
            <Button icon={<EditOutlined/>} onClick={() => setVisibility(true)}>Show self check form</Button>
            {/* <CheckInfo isVisible={isCheckInfoVisible} onClose={handleCheckInfoClose} form={form}/> */}
            <RequestForm isVisible={isVisible} onClose={handleClose} onFormSubmit={handleFormSubmit} form={form}/>
        </div>
    );
};
