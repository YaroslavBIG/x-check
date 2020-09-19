import './Tasks.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useContext } from 'react';
import { TaskDrawerContext } from './TaskDrawer/TaskDrawerContext';

export const TasksHeader = () => {
	const { confirm } = Modal;

	const { stateShowDrawer, setStateShowDrawer } = useContext(TaskDrawerContext);

	const showDrawer = () => {
		setStateShowDrawer(true);
	};

	function showConfirm() {
		confirm({
			title: 'Delete Sessions',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to delete the selected sessions?',
			onOk() {
				// deleteSession();
			}
		});
	}

	// disabled={selectedRows?.length !== 1}
	// disabled={!selectedRows?.length}

	return (
		<div className='tasks-header'>
			<Button icon={<EditOutlined />} className='tasks-header--button' onClick={() => 'updateSession()'}>
				Edit
			</Button>
			<Button icon={<DeleteOutlined />} className={'tasks-header--button'} onClick={showConfirm}>
				Delete
			</Button>
			<Button type='primary' icon={<PlusOutlined />} onClick={showDrawer}>
				Add
			</Button>
		</div>
	);
};
