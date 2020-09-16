import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useContext } from 'react';
import { Iitem } from '../../TaskInterface';
import { TaskContext } from '../TaskContext';

interface ItaskItemButtons {
	elTitle: string;
	elId: string;
}

export const TaskItemButtons = (props: ItaskItemButtons) => {
	const { setEditItem, setNewItems } = useContext(TaskContext);
	const { elTitle, elId } = props;

	const itemButtonsHandler = (dataSet: DOMStringMap) => {
		const { id, title, type } = dataSet;

		switch (type) {
			case 'edit':
				setEditItem(true);
				break;
			case 'delete':
				setNewItems((prev: Array<Iitem>) => [
					...prev.filter((item) => (item.id === id && item.title === title ? false : true))
				]);
				break;
			default:
				break;
		}
	};

	return (
		<div className='task--control-buttons'>
			<Button
				type='text'
				icon={<EditOutlined />}
				size='middle'
				htmlType='button'
				data-id={elId}
				data-title={elTitle}
				data-type='edit'
				onClick={(ev) => itemButtonsHandler(ev.currentTarget.dataset)}
			/>
			<Button
				type='text'
				htmlType='button'
				icon={<DeleteOutlined />}
				size='middle'
				data-id={elId}
				data-title={elTitle}
				data-type='delete'
				onClick={(ev) => itemButtonsHandler(ev.currentTarget.dataset)}
			/>
		</div>
	);
};
