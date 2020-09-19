import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { Collapse } from 'antd';
import { AddCheckButton } from './AddCheckButton';
import { ItemsList } from '../TaskItems/ItemsList';

export const TaskAccordion = () => {
	const { Panel } = Collapse;
	const { newTask, setCollapsePanelNum } = useContext(TaskContext);

	const collapseHandler = (panelNum: string | string[]) => {
		if (!!panelNum) setCollapsePanelNum(panelNum);
	};

	return (
		<Collapse accordion onChange={(key) => collapseHandler(key)}>
			{newTask.categoriesOrder.map((el: string, idx: number) => (
				<Panel
					header={el}
					key={idx}
					extra={<AddCheckButton panelNum={idx} elId={`${el.replace(/\s+/g, '')}_p${idx}`} />}
				>
					<ItemsList />
				</Panel>
			))}
		</Collapse>
	);
};
