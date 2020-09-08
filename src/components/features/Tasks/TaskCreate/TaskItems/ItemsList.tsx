import React from 'react';
import { Button } from 'antd';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';

export const ItemsList = () => {

  return (
    <>
      <Button icon={<SaveOutlined />} size='middle' htmlType="submit" onSubmit={() => "handleItemSubmit"} />
      <Button htmlType="button" icon={<DeleteOutlined />} size='middle' onClick={() => "onReset"} />
    </>
  )
}
