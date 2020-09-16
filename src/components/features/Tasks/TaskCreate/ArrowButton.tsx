import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TaskContext } from './TaskContext';

export const ArrowButton = (props: any) => {
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
