import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {Button} from 'antd';
import { TaskContext } from './TaskContext';


export const ArrowButton = (props: any) => {
  const { addTaskToggler } = useContext(TaskContext)

  return (
    <Button type="text" icon={<ArrowLeftOutlined {...props} />} onClick={addTaskToggler}></Button>
  )
}
