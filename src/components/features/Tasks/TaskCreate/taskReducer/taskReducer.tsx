import { Itask, taskStatus } from 'interfaces/TaskInterface';
import { taskReducerActions } from './actions';

export const initialTaskState: Itask = {
	id: '',
	author: '',
	state: taskStatus.DRAFT,
	maxScore: 0,
	categoriesOrder: [],
	items: []
};

export const taskReducer = (state = initialTaskState, action: any) => {
	const { CHANGE, DELETE } = taskReducerActions;

	switch (action.type) {
		case CHANGE:
			return { ...state, status: CHANGE };
		case DELETE:
			return { ...state, status: DELETE };
		default:
			return state;
	}
};
