import React, { useState } from 'react';
import {Button} from 'antd';
import { TaskCreateDefault } from './TaskCreateDefault';
import { TaskAddCateory } from './TaskAddCategory';


export interface IAddTask {
  addTask: boolean
}

export const TaskCreate: React.FC = () => {
  const [addTask, setAddTask]= useState(false)
  const addTaskToggler = () => {
    setAddTask((prevState) => !prevState)
  }
    return (
        <div className="taskCreate">
        {addTask ? <TaskAddCateory /> : <TaskCreateDefault />}
          <div className="task-add-category">
          {addTask ?
          null
          :
          <Button type='default' size='middle' onClick={addTaskToggler} > Add category </Button>
          }
          </div>
        </div>
    )
}
