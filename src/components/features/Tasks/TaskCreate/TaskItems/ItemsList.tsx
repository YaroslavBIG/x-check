import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { TaskItem } from './TaskItem';
import { Isubitem } from '../../TaskInterface';

export const ItemsList = () => {
  const { newTask, collapsePanelNum } = useContext(TaskContext);

  return (
    <>
    {newTask.items[collapsePanelNum] ?
        newTask.items[collapsePanelNum].map((el: Isubitem, idx: number) =>
        <TaskItem {...el} key={idx} />
      ) : null
    }
  </>
  )
}
