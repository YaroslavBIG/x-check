import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { Collapse, Empty } from 'antd';
import { AddCheckButton } from '../TaskItems/AddCheckButton';

export const TaskAccordion = () => {
  const { Panel } = Collapse;
  const { newTask, setCollapsePanelNum } = useContext(TaskContext);

  const categotes = newTask.categoriesOrder.map((el: any, idx: number) => (
    <Panel header={el.name} key={idx} id={el.order} extra={<AddCheckButton />}>
      {newTask.items[idx] ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Panel>
  ))

  return (
    <Collapse accordion onChange={(key) => setCollapsePanelNum(Number(key))}>
      {categotes}
    </Collapse>
  )
}
