import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CheckInfo from '../CheckInfo/CheckInfo';

export const Requests = () => {
    const [isVisible, setVisibility] = useState(false);
    const [form] = Form.useForm();

    const onClose = () => {
        setVisibility(false);
        form.resetFields();
    }

    return (
        <div>
            <h1>Requests</h1>
            <Button icon={<EditOutlined/>} onClick={() => setVisibility(true)}>Show check info form</Button>
            <CheckInfo isVisible={isVisible} onClose={onClose} form={form}/>
        </div>
    );
};
