import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CheckInfo from '../CheckInfo/CheckInfo';

export const Requests = () => {
    const [isVisible, setVisibility] = useState(false);

    return (
        <div>
            <h1>Requests</h1>
            <Button icon={<EditOutlined/>} onClick={() => setVisibility(true)}>Show check info form</Button>
            <CheckInfo isVisible={isVisible} onClose={() => setVisibility(false)}/>
        </div>
    );
};
