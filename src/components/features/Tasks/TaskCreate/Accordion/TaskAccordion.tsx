import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { Collapse } from 'antd';
import { AddCheckButton } from '../TaskItems/AddCheckButton';
import { ItemsList } from '../TaskItems/ItemsList';

export const TaskAccordion = () => {
  const { Panel } = Collapse;
  const { newTask, setCollapsePanelNum } = useContext(TaskContext);

  const categores = newTask.categoriesOrder.map((el: any, idx: number) => (
    <Panel header={el} key={idx} extra={<AddCheckButton />}>
      <ItemsList />
    </Panel>
  ))

  return (
    <Collapse accordion onChange={(key) => setCollapsePanelNum(Number(key))}>
      {categores}
    </Collapse>
  )
}
