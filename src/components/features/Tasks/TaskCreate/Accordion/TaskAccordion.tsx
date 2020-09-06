import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { Collapse } from 'antd';
import { addCheck } from '../TaskItems/addCheck';

export const TaskAccordion = () => {
  const { Panel } = Collapse;
  const { newTask } = useContext(TaskContext);

  const categotes = newTask.categoriesOrder.map((el: any, idx: number) => (
    <Panel header={el.name} key={el.order + idx} extra={addCheck()}>
      <p>{el.name}</p>
    </Panel>
  ))

  return (
    <Collapse accordion>
      {categotes}
    </Collapse>
  )
}
