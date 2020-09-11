import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CheckInfo from '../CheckInfo/CheckInfo';
import Selfcheck from '../Self-check/Self-check';

export const Requests = () => {
    const [isCheckInfoVisible, setCheckInfoVisibility] = useState(false);
    const [isSelfCheckVisible, setSelfCheckVisibility] = useState(false);
    const [form] = Form.useForm();

    const onCheckInfoClose = () => {
        setCheckInfoVisibility(false);
        form.resetFields();
    }

    const onSelfCheckClose = () => {
        setSelfCheckVisibility(false);
        form.resetFields();
    }

    return (
        <div>
            <h1>Requests</h1>
            <Button icon={<EditOutlined/>} onClick={() => setCheckInfoVisibility(true)}>Show check info form</Button>
            <Button icon={<EditOutlined/>} onClick={() => setSelfCheckVisibility(true)}>Show self check form</Button>
            <CheckInfo isVisible={isCheckInfoVisible} onClose={onCheckInfoClose} form={form}/>
            <Selfcheck isVisible={isSelfCheckVisible} onClose={onSelfCheckClose} form={form}/>
        </div>
    );
};
