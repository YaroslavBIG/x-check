import React, { useContext } from 'react';
import { Drawer } from 'antd';
import { TaskDrawerContext } from './TaskDrawerContext';

export const TaskDrawer: React.FC = (props) => {
	const { stateShowDrawer, setStateShowDrawer, setSelectedRowKeys } = useContext(TaskDrawerContext);

	const onClose = () => {
		setStateShowDrawer(false);
		setSelectedRowKeys([]);
	};

	return (
		<Drawer placement='left' width={'640px'} closable={false} onClose={onClose} visible={stateShowDrawer}>
			{props.children}
		</Drawer>
	);
};
