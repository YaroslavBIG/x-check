import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useContext } from 'react';
import { Iitem } from '../../../../../interfaces/TaskInterface';
import { TaskContext } from '../TaskContext';

interface ItaskItemButtons {
	elTitle: string;
	elId: string;
}

export const TaskItemButtons = (props: ItaskItemButtons) => {
	const { setEditItem, setNewItems, setRefactorItem, items, setCollapsPanelId } = useContext(TaskContext);
	const { elTitle, elId } = props;

	const itemButtonsHandler = (dataSet: DOMStringMap) => {
		const { id, title, type } = dataSet;
		const currentItem = items.filter((item: Iitem) => (item.id === id && item.title === title ? true : false));

		switch (type) {
			case 'edit':
				setCollapsPanelId(id);
				setRefactorItem(currentItem);
				setEditItem(true);
				break;
			case 'delete':
				setNewItems((prev: Array<Iitem>) => [
					...prev.filter((item) => !(item.id === id && item.title === title))
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
