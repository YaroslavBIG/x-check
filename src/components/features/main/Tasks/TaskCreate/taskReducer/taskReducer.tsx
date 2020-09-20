import { Itask } from 'interfaces/TaskInterface';
import { taskReducerActions } from './actions';

export const initialTaskState: null = null;

export const setTask = (payload: Itask | null) => {
	return {
		type: taskReducerActions.CHANGE,
		payload
	};
};

export const deleteTask = () => {
	return {
		type: taskReducerActions.DELETE,
		payload: null
	};
};

export const taskDescriptionVisible = (isVisible: boolean, id?: string) => {
	return {
		type: taskReducerActions.ISVISIBLE,
		payload: { isVisible, id }
	};
};

export const taskReducer = (state = initialTaskState, action: any) => {
	const { CHANGE, DELETE, ISVISIBLE, SHOWTASK } = taskReducerActions;

	switch (action.type) {
		case CHANGE:
			return { ...action.payload };
		case DELETE:
			return initialTaskState;
		case ISVISIBLE:
			return { ...action.payload };
		case SHOWTASK:
			return state;
		default:
			return initialTaskState;
	}
};
