import React, { useContext } from 'react';
import {Button} from 'antd';
import { TaskCreateDefault } from './TaskCreateDefault';
import { TaskAddCateory } from './TaskAddCategory';
import {PlusOutlined} from '@ant-design/icons';
import { TaskContext } from './TaskContext';
import { AddTaskItem } from './TaskItems/AddTaskItem';

export interface IAddTask {
  addTask: boolean
}

export const TaskCreate: React.FC = () => {
  const { addTask, addTaskToggler, itemAddPage } = useContext(TaskContext);
    return (
      <div className="taskCreate">
        {
        itemAddPage ?
          <AddTaskItem />
          :
          (addTask ? <TaskAddCateory /> : <TaskCreateDefault />)
        }
        {/* <div className="task-add-category">
          {addTask || itemAddPage ?
        null
        :
          <Button type='default' size='middle' onClick={addTaskToggler} icon={<PlusOutlined />} > Add category </Button>
        }
        </div> */}
      </div>
    )
}
