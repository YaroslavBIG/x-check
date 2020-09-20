import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TaskContext } from './TaskContext';

interface IarrowButtonProps {
	children?: React.ReactNode;
	setItemAddPage?: React.Dispatch<React.SetStateAction<number>>;
	itemAddPage?: boolean | number;
	setAddTask?: React.Dispatch<React.SetStateAction<boolean>>;
	editItem?: string | Boolean;
	addTask?: React.Dispatch<React.SetStateAction<boolean>>;
	editCategory?: string | Boolean;
	setEditCategory?: React.Dispatch<React.SetStateAction<string | Boolean>>;
	setEditItem?: React.Dispatch<React.SetStateAction<string | Boolean>>;
}

export const ArrowButton = (props: IarrowButtonProps) => {
	const {
		setItemAddPage,
		itemAddPage,
		setAddTask,
		editItem,
		addTask,
		editCategory,
		setEditCategory,
		setEditItem
	} = useContext(TaskContext);

	const toTaskCreateHandler = () => {
		setAddTask(false);
		setItemAddPage(false);
		setEditCategory(false);
		setEditItem(false);
	};

	const arrowButtonHandler = () => {
		if (itemAddPage || addTask || editCategory || editItem) {
			toTaskCreateHandler();
		} else {
			setAddTask(true);
		}
	};

	return <Button type='text' icon={<ArrowLeftOutlined {...props} />} onClick={arrowButtonHandler} />;
};
