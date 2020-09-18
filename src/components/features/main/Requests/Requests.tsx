import React, { useState } from 'react';
import { Form } from 'antd';

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
        </div>
    );
};
