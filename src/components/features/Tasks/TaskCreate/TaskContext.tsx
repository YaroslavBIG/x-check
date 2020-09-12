import React, { useState } from 'react';
import { Iitem, Itask, taskStatus } from '../TaskInterface';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const TaskContextState: React.FC = (props) => {
  const [addTask, setAddTask] = useState(false);
  const [itemAddPage, setItemAddPage] = useState(false);
  const [collapsePanelNum, setCollapsePanelNum] = useState<number>(0);
  const [collapsPanetId, setCollapsPanelId] = useState<string | undefined>(undefined)
  const [newTask, setNewTask] = useState<Itask | undefined>(
    {
      id: '',
      author: '',
      state: taskStatus.DRAFT,
      maxScore: 0,
      categoriesOrder: [],
      items: []
    });

  const [items, setNewItems] = useState<Array<Iitem> | Array<undefined>>([]);


  const addTaskToggler = () => {
    setAddTask((prevState) => !prevState);
    setItemAddPage(false)
  };

  const addItemToggler = () => {
    setItemAddPage((prevState) => !prevState);
    setAddTask(false)
  };

  return (
    <TaskProvider
      value={
        {
          addTask: addTask,
          setAddTask: setAddTask,
          collapsePanelNum: collapsePanelNum,
          setCollapsePanelNum: setCollapsePanelNum,
          collapsPanetId: collapsPanetId,
          setCollapsPanelId: setCollapsPanelId,
          addTaskToggler: addTaskToggler,
          itemAddPage: itemAddPage,
          setItemAddPage: setItemAddPage,
          addItemToggler: addItemToggler,
          newTask: newTask,
          setNewTask: setNewTask,
          items: items,
          setNewItems: setNewItems
        }
      }
    >
      {props.children}
    </TaskProvider>
  );
}
