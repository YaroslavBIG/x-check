import {initialTaskState} from './taskReducer';

// export const setCorrectAnswerAC = () => ({ type: SET_CORRECT_ANSWER })
// export const setIncorrectAnswerAC = (birdName) => ({ type: SET_INCORRECT_ANSWER, birdName })

export enum taskReducerActions {
  CHANGE = 'CHANGE',
  DELETE = 'DELETE',
}

export const clearTask = () => ({ type: taskReducerActions.DELETE, initialTaskState })
