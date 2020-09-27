import React, { useContext } from 'react';
import { Button } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import { TaskContext } from '../TaskContext';
import { saveAs } from 'file-saver';

export const TaskImport = () => {
	const { newTaskForSubmit } = useContext(TaskContext);
	const saveToJson = () => {
		const str = JSON.stringify(newTaskForSubmit, null, 2);
		const blob = new Blob([ str ], { type: "application/json';charset=utf-8" });
		return saveAs(blob, `${newTaskForSubmit.id}.json`);
	};
	return (
		<Button type='default' className={'button-import'} disabled={!newTaskForSubmit?.id} icon={<SaveFilled />} onClick={saveToJson}>
			Save to JSON
		</Button>
	);
};
