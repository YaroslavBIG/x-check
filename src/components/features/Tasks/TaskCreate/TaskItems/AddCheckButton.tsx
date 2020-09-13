import React, { useContext } from 'react';
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { TaskContext } from '../TaskContext';

export interface addCheckButtonProps {
	panelNum: number;
	elId: string;
}

export const AddCheckButton = (props: addCheckButtonProps) => {
	const { addItemToggler, setCollapsPanelId, setCollapsePanelNum } = useContext(TaskContext);
	const addCheckHandler = (ev: any) => {
		ev.preventDefault();
		setCollapsPanelId(ev.currentTarget.dataset.id);
		setCollapsePanelNum(ev.currentTarget.dataset.num);
		addItemToggler();
	};

	function handleMenuClick(e: any) {
		console.log('click', e);
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key='1' icon={<EditOutlined />}>
				Edit
			</Menu.Item>
			<Menu.Item key='2' icon={<DeleteOutlined />}>
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
				add check
			</Button>
			<Dropdown overlay={menu}>
				<Button type='text' icon={<MoreOutlined />} />
			</Dropdown>
		</div>
	);
};
