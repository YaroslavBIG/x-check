import React, { useMemo, useState } from 'react';
import { Iitem, Itask, ITaskLayoutProps, taskStatus } from '../../../../interfaces/TaskInterface';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const TaskContextState = (props: ITaskLayoutProps) => {
  const [addTask, setAddTask] = useState<boolean | string>(false);
  const [itemAddPage, setItemAddPage] = useState<boolean | string>(false);
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
  const [newTaskForSubmit, setNewTaskForSubmit] = useState<Itask | object>(props.inicialState || {});
  const [editCategory, setEditCategory] = useState<string | Boolean>(false)
  const [editItem, setEditItem] = useState<string | Boolean>(false)
  const [refactorItem, setRefactorItem] = useState<Iitem | null>(null)
  const [oldTaskName, setOldTaskName] = useState<string | undefined>(useMemo(() => props.inicialState?.id, [props]))

  const addTaskToggler = () => {
    setAddTask((prevState) => !prevState);
    setItemAddPage(false)
  };

  const returnToTaskDefault = () => {
    setEditItem(false)
    setEditCategory(false)
    setItemAddPage(false)
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
          returnToTaskDefault: returnToTaskDefault,
          newTask: newTask,
          setNewTask: setNewTask,
          items: items,
          setNewItems: setNewItems,
          newTaskForSubmit: newTaskForSubmit,
          setNewTaskForSubmit: setNewTaskForSubmit,
          editCategory: editCategory,
          setEditCategory: setEditCategory,
          editItem: editItem,
          setEditItem: setEditItem,
          oldTaskName: oldTaskName,
          setOldTaskName: setOldTaskName,
          refactorItem: refactorItem,
          setRefactorItem: setRefactorItem
        }
      }
    >
      {props.children}
    </TaskProvider>
  );
}
