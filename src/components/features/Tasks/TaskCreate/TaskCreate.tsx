import React, { useContext } from 'react';
import { TaskCreateDefault } from './TaskCreateDefault';
import { TaskAddCateory } from './TaskAddCategory';
import { TaskContext } from './TaskContext';
import { AddTaskItem } from './TaskItems/AddTaskItem';

export interface IAddTask {
	addTask: boolean;
}

// {/* {editCategory ? (
// 				<TaskAddCateory />
// 			) : itemAddPage ? (
// 				<AddTaskItem />
// 			) : addTask ? (
// 				<TaskAddCateory />
// 			) : (
// 				<TaskCreateDefault />
// 			)} */}

export const TaskCreate: React.FC = () => {
	const { addTask, itemAddPage, editCategory, editItem } = useContext(TaskContext);

	const page = () => {
		if (editCategory) {
			return <TaskAddCateory />;
		} else if (editItem) {
			return <AddTaskItem />;
		} else if (itemAddPage) {
			return <AddTaskItem />;
		} else if (addTask) {
			return <TaskAddCateory />;
		} else {
			return <TaskCreateDefault />;
		}
	};

	return <div className='taskCreate'>{page()}</div>;
};
