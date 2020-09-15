import React from 'react';
import './Tasks';
import { TaskLayout } from './TaskCreate/TaskLayout';

const Tasks = () => {
	// const demoTask = {
	// 	id: 'Demo',
	// 	description:
	// 		'DemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemoDemo',
	// 	items: [
	// 		{
	// 			order: 1,
	// 			id: 'BaseScore_p0',
	// 			mentorOnly: null,
	// 			description: '',
	// 			category: 'Base Score',
	// 			title: 'demo',
	// 			minScore: 0,
	// 			maxScore: 4
	// 		}
	// 	],
	// 	maxScore: 4,
	// 	categoriesOrder: [ 'Base Score' ],
	// 	author: 'Get Name from login',
	// 	state: 'Archived'
	// };
	return (
		<div>
			{/* inicialState={demoTask} */}
			<TaskLayout />
		</div>
	);
};

export default Tasks;
