import React from 'react';
import {Button} from 'antd';
import { ArrowButton } from './ArrowButton';

export interface TaskHeaderProps {
  arrowButton?: boolean
  title: string
  onReset: () => void
  handleSubmit: () => void
}


export const TaskHeader = (props: TaskHeaderProps) => {
  const {
    onReset,
    handleSubmit,
    title,
    arrowButton,
  } = props;
  return (
    <span className='task-header'>

      {arrowButton ?
        <ArrowButton />
          :
          null
        }

        {title}

      <Button htmlType="button" type='primary' size='middle' onClick={onReset}>
        Cancel
          </Button>

      <Button type='default' size='middle' htmlType="submit" onSubmit={handleSubmit}>
        Save
          </Button>
    </span>
  )
}
