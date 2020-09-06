import React, { useState } from 'react';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const TaskContextState: React.FC = (props) => {
  const [addTask, setAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    id: '',
    author: '',
    state: '',
    maxScore: 0,
    categoriesOrder: [],
    items: []
  })


  const addTaskToggler = () => {
    setAddTask((prevState) => !prevState)
  }

  return (
    <TaskProvider
      value={
        {
          addTask: addTask,
          addTaskToggler: addTaskToggler,
          newTask: newTask,
          setNewTask: setNewTask
        }
      }
    >
      {props.children}
    </TaskProvider>
  );
}
