import {initialTaskState} from './taskReducer';

export enum taskReducerActions {
  CHANGE = 'CHANGE',
  DELETE = 'DELETE',
}

export const clearTask = () => ({ type: taskReducerActions.DELETE, initialTaskState })
