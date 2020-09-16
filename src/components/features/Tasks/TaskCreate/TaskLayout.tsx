import React from 'react';
import './TaskCreate.scss';
import { TaskContextState } from './TaskContext';
import { TaskCreate } from './TaskCreate';
import { ITaskLayoutProps } from '../../../../interfaces/TaskInterface';

export const TaskLayout = (props: ITaskLayoutProps) => {
	return (
		<TaskContextState {...props}>
			<TaskCreate />
		</TaskContextState>
	);
};
