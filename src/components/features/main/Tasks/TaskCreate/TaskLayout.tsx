import React from 'react';
import './TaskCreate.scss';
import { TaskContextState } from './TaskContext';
import { TaskCreate } from './TaskCreate';

export const TaskLayout = () => {
	return (
		<TaskContextState>
			<TaskCreate />
		</TaskContextState>
	);
};
