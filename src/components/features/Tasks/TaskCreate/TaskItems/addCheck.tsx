import React from 'react';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';


export const addCheck = () => {

  return (
    <div className='icon--plus'>
      <Button type="text" icon={<PlusOutlined />}>add check</ Button>
      <Button type="text" icon={<MoreOutlined />} />
    </div>
  )
}
