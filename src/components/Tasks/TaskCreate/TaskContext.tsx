import React, { useState } from 'react';

export const TaskContext: any = React.createContext(false);
export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export const TaskContextState: React.FC = (props) => {
  const [addTask, setAddTask]= useState(false)

  const addTaskToggler = () => {
    setAddTask((prevState) => !prevState)
  }

  return (
    <TaskProvider
      value={
        {
          addTask: addTask,
          setAddTask: setAddTask,
          addTaskToggler: addTaskToggler
        }
      }
    >
      {props.children}
    </TaskProvider>
  );
}
