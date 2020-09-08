import React, { useContext } from 'react';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TaskContext } from '../TaskContext';


export const AddCheckButton = () => {
  const { addItemToggler } = useContext(TaskContext)
  const addCheckHandler = (ev: any) => {
    ev.preventDefault();
    addItemToggler()
  }

  return (
    <div className='icon--plus'>
      <Button type="text" onClick={addCheckHandler} icon={<PlusOutlined />}>add check</ Button>
      <Button type="text" icon={<MoreOutlined />} />
    </div>
  )
}
