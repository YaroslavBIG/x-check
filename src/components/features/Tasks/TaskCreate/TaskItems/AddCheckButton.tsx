import React, { useContext } from 'react';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
			<Button type='text' icon={<MoreOutlined />} />
		</div>
	);
};
