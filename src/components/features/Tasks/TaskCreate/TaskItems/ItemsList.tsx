import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { TaskItem } from './TaskItem';
import { Iitem } from '../../TaskInterface';
import { Empty } from 'antd';

export const ItemsList = () => {
  const { newTask, items, collapsePanelNum } = useContext(TaskContext);
  console.log(items)
  return (
    <>
    {items.length ?
        items.filter((item: Iitem) =>
          item.category === newTask.categoriesOrder[collapsePanelNum])
         .map((el: Iitem, idx: number) =>
        <TaskItem {...el} key={items.id} />
        ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
  </>
  )
}
