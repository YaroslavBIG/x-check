import {initialTaskState} from './taskReducer';

export enum taskReducerActions {
  CHANGE = 'CHANGE',
  DELETE = 'DELETE',
  SHOWTASK = 'SHOWTASK',
  ISVISIBLE = 'ISVISIBLE'
}

export const clearTask = () => ({ type: taskReducerActions.DELETE, initialTaskState })
