import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { Collapse } from 'antd';
import { addCheck } from '../TaskItems/addCheck';
import { AddTaskItem } from '../TaskItems/AddTaskItem';

export const TaskAccordion = () => {
  const { Panel } = Collapse;
  const { newTask } = useContext(TaskContext);

  const categotes = newTask.categoriesOrder.map((el: any, idx: number) => (
    <Panel header={el.name} key={el.order + idx} extra={addCheck()}>
      <AddTaskItem />
    </Panel>
  ))

  return (
    <Collapse accordion>
      {categotes}
    </Collapse>
  )
}
