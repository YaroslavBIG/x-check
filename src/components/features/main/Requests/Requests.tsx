import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CheckInfo from '../CheckInfo/CheckInfo';
import Selfcheck from '../Selfcheck/Selfcheck';

export const Requests = () => {
    const [isCheckInfoVisible, setCheckInfoVisibility] = useState(false);
    const [isSelfCheckVisible, setSelfCheckVisibility] = useState(false);
    const [form] = Form.useForm();

    const handleCheckInfoClose = () => {
        setCheckInfoVisibility(false);
        form.resetFields();
    }

    const handleSelfCheckClose = () => {
        setSelfCheckVisibility(false);
        form.resetFields();
    }

    const handleFormSubmit = () => {
        setSelfCheckVisibility(false);
        form.resetFields();
    }

    return (
        <div>
            <h1>Requests</h1>
            <Button icon={<EditOutlined/>} onClick={() => setCheckInfoVisibility(true)}>Show check info form</Button>
            <Button icon={<EditOutlined/>} onClick={() => setSelfCheckVisibility(true)}>Show self check form</Button>
            <CheckInfo isVisible={isCheckInfoVisible} onClose={handleCheckInfoClose} form={form}/>
            <Selfcheck isVisible={isSelfCheckVisible} onClose={handleSelfCheckClose} onFormSubmit={handleFormSubmit} form={form}/>
        </div>
    );
};
