import React, { useContext } from 'react';
import { TaskCreateDefault } from './TaskCreateDefault';
import { TaskAddCateory } from './TaskAddCategory';
import { TaskContext } from './TaskContext';
import { AddTaskItem } from './TaskItems/AddTaskItem';

export interface IAddTask {
	addTask: boolean;
}

export const TaskCreate: React.FC = () => {
	const { addTask, itemAddPage, editCategory } = useContext(TaskContext);
	return (
		<div className='taskCreate'>
			{editCategory ? (
				<TaskAddCateory />
			) : itemAddPage ? (
				<AddTaskItem />
			) : addTask ? (
				<TaskAddCateory />
			) : (
				<TaskCreateDefault />
			)}
		</div>
	);
};
