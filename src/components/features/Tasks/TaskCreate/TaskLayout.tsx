import React from 'react';
import { TaskContextState } from './TaskContext';
import { TaskCreate } from './TaskCreate';

export const TaskLayout = () => {
  return (
    <TaskContextState>
      <TaskCreate>

      </TaskCreate>
    </TaskContextState>
  )
}
