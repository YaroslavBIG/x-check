import React from 'react';
import './TaskCreate.scss';
import { TaskContextState } from './TaskContext';
import { TaskCreate } from './TaskCreate';
import { ITaskLayoutProps } from '../TaskInterface';


export const TaskLayout = (props: ITaskLayoutProps) => {
  console.log(props)
  return (
    <TaskContextState {...props} >
      <TaskCreate>

      </TaskCreate>
    </TaskContextState>
  )
}
