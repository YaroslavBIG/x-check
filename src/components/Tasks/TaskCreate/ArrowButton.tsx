import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {Button} from 'antd';


export const ArrowButton = (props: any) => {

  const backHandler = () => {
    console.log('arrowButtonHandler')
  }
  return (
    <Button type="text" icon={<ArrowLeftOutlined {...props} />} onClick={backHandler}></Button>
  )
}
