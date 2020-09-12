import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { TaskItem } from './TaskItem';
import { Iitem } from '../../TaskInterface';
import { Empty } from 'antd';

export const ItemsList = () => {
  const { newTask, items, collapsePanelNum } = useContext(TaskContext);
  console.log(items)
  const selectedCategoryItems = items.filter((item: Iitem) =>
    item.category === newTask.categoriesOrder[collapsePanelNum])

  return (
    <>
    {selectedCategoryItems.length ?
        selectedCategoryItems.map((el: Iitem, idx: number) =>
        <TaskItem {...el} key={items.id + idx} />)
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
  </>
  )
}
