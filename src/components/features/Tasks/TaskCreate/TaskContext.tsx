import React, { useState } from 'react';
import { Iitem, Itask, ITaskLayoutProps, taskStatus } from '../TaskInterface';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const TaskContextState = (props: ITaskLayoutProps) => {
  const [addTask, setAddTask] = useState(false);
  const [itemAddPage, setItemAddPage] = useState(false);
  const [collapsePanelNum, setCollapsePanelNum] = useState<number>(0);
  const [collapsPanetId, setCollapsPanelId] = useState<string | undefined>(undefined)
  const [newTask, setNewTask] = useState<Itask | undefined>(props.inicialState ||
    {
      id: '',
      author: '',
      state: taskStatus.DRAFT,
      maxScore: 0,
      categoriesOrder: [],
      items: []
    });

  const [items, setNewItems] = useState<Array<Iitem> | Array<undefined>>(props.inicialState?.items || []);
  const [newTaskForSubmit, setNewTaskForSubmit] = useState(props.inicialState || {});

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
          setNewItems: setNewItems,
          newTaskForSubmit: newTaskForSubmit,
          setNewTaskForSubmit: setNewTaskForSubmit
        }
      }
    >
      {props.children}
    </TaskProvider>
  );
}
