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
    <div className='task-header'>
      <div className="task-header--title">
        <div className="header-title--arrow-button">
          {arrowButton ?
            <ArrowButton />
            :
            null
          }
        </div>
        <div className="header-title--title">
          {title}
        </div>
      </div>

      <div className="task-header--buttons-control">
        <Button htmlType="button" type='primary' size='middle' onClick={onReset}>
          Cancel
        </Button>

        <Button type='default' size='middle' htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>

    </div>
  )
}
