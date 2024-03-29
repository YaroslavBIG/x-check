import React, { useContext } from 'react';
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { TaskContext } from '../TaskContext';
import { Iitem, Itask } from 'interfaces/TaskInterface';

export interface addCheckButtonProps {
	panelNum: number;
	elId: string;
}

export const AddCheckButton = (props: addCheckButtonProps) => {
	const {
		setItemAddPage,
		setCollapsPanelId,
		setCollapsePanelNum,
		setNewItems,
		newTask,
		setNewTask,
		setEditCategory
	} = useContext(TaskContext);

	const addCheckHandler = (ev: any) => {
		ev.preventDefault();
		setCollapsPanelId(ev.currentTarget.dataset.id);
		setCollapsePanelNum(ev.currentTarget.dataset.num);
		setItemAddPage(true);
	};

	const handleMenuClick = (e: any) => {
		const { num, id, type } = e.domEvent.currentTarget.dataset;
		const currentCategory = newTask.categoriesOrder[num];

		switch (type) {
			case 'edit':
				setEditCategory(currentCategory);
				break;

			case 'remove':
				setNewTask((prev: Itask) => ({
					...prev,
					categoriesOrder: [ ...prev.categoriesOrder.filter((category) => category !== currentCategory) ]
				}));
				setNewItems((prev: Array<Iitem>) => [ ...prev.filter((item) => item.id !== id) ]);
				break;

			default:
				break;
		}
	};

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item
				data-num={props.panelNum}
				data-id={props.elId}
				data-type='edit'
				key={`edit_${props.elId}`}
				icon={<EditOutlined />}
			>
				Edit
			</Menu.Item>
			<Menu.Item
				data-num={props.panelNum}
				data-id={props.elId}
				data-type='remove'
				key={`remove_${props.elId}`}
				icon={<DeleteOutlined />}
			>
				Remove
			</Menu.Item>
		</Menu>
	);

	return (
		<div className='icon--plus'>
			<Button
				type='text'
				onClick={addCheckHandler}
				data-num={props.panelNum}
				data-id={props.elId}
				icon={<PlusOutlined />}
			>
				Add check
			</Button>
			<Dropdown overlay={menu}>
				<Button type='text' icon={<MoreOutlined />} />
			</Dropdown>
		</div>
	);
};
