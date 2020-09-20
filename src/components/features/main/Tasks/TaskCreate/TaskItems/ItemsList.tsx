import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { TaskItem } from './TaskItem';
import { Iitem } from 'interfaces/TaskInterface';
import { Empty } from 'antd';

export const ItemsList = () => {
  const { newTask, items, collapsePanelNum } = useContext(TaskContext);
  const category = newTask.categoriesOrder[collapsePanelNum];
  const selectedCategoryItems = items.filter((item: Iitem) =>
    item.category === category)

  return (
    <>
    {selectedCategoryItems.length ?
        selectedCategoryItems.map((el: Iitem, idx: number) =>
        <TaskItem {...el} key={idx + 100} />)
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
  </>
  )
}
