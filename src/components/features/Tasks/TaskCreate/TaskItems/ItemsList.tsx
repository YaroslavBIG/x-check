import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { TaskItem } from './TaskItem';
import { Iitem } from '../../TaskInterface';

export const ItemsList = () => {
  const { newTask, collapsePanelNum } = useContext(TaskContext);

  return (
    <>
    {newTask.items[collapsePanelNum] ?
        newTask.items[collapsePanelNum].map((el: Iitem, idx: number) =>
        <TaskItem {...el} key={idx} />
      ) : null
    }
  </>
  )
}
