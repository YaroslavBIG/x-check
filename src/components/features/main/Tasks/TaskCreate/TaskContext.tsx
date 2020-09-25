import React, { useEffect, useState } from 'react';
import { Iitem, Itask, ITaskLayoutProps, taskStatus } from 'interfaces/TaskInterface';
import { useSelector } from 'react-redux';
import { SessionsState } from 'interfaces/sessions-state.interface';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const initialState = {
	id: '',
	author: '',
	description: '',
	state: taskStatus.DRAFT,
	maxScore: 0,
	categoriesOrder: [],
	items: []
};

export const TaskContextState = (props: ITaskLayoutProps) => {
  const taskState: Itask | null = useSelector((state: SessionsState) => state.taskStore);
  const taskStateId = taskState?.id || false

	const [ addTask, setAddTask ] = useState<boolean | string>(false);
	const [ itemAddPage, setItemAddPage ] = useState<boolean | string>(false);
	const [ collapsePanelNum, setCollapsePanelNum ] = useState<number>(0);
	const [ collapsPanetId, setCollapsPanelId ] = useState<string | undefined>(undefined);
	const [ newTask, setNewTask ] = useState<Itask | undefined>(initialState);

	const [ items, setNewItems ] = useState<Array<Iitem> | Array<undefined>>([]);
	const [ newTaskForSubmit, setNewTaskForSubmit ] = useState<Itask | object>(taskState || {});
	const [ editCategory, setEditCategory ] = useState<string | Boolean>(false);
	const [ editItem, setEditItem ] = useState<string | Boolean>(false);
	const [ refactorItem, setRefactorItem ] = useState<Iitem | null>(null);
  const [ oldTaskName, setOldTaskName ] = useState<string | undefined>();
  const [ uploudedTask, setUploudedTask ] = useState<Itask | null>(null)

  const resetTaskToInitialState = () => {
    setNewTask(initialState);
    setNewTaskForSubmit(initialState);
    setOldTaskName(initialState.id);
    setRefactorItem(null);
    setNewItems([]);
  }

  useEffect(() => {
   if(uploudedTask) {
     setNewTask({
       ...uploudedTask
     })
     if(uploudedTask.items?.length){
     setNewItems(
       [...uploudedTask.items]
     )}
   }
  }, [uploudedTask]);

	useEffect(
		() => {
			if (taskStateId) {
        setNewTask(taskState);
        if(taskState?.items?.length){
        setNewItems(
       [...taskState?.items]
     )}
				setOldTaskName(taskState.id);
			} else {
				resetTaskToInitialState()
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[taskState]
	);

	const addTaskToggler = () => {
		setAddTask((prevState) => !prevState);
		setItemAddPage(false);
	};

	const returnToTaskDefault = () => {
		setEditItem(false);
		setEditCategory(false);
		setItemAddPage(false);
		setAddTask(false);
	};

	return (
		<TaskProvider
			value={{
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
        setRefactorItem: setRefactorItem,
        setUploudedTask: setUploudedTask,
        resetTaskToInitialState: resetTaskToInitialState
			}}
		>
			{props.children}
		</TaskProvider>
	);
};
