import { Task, taskStatus } from "components/Tasks/TaskInterface"

export enum taskReducerActions {
  CHANGE = 'CHANGE',
  DELETE = 'DELETE',
}

const initialState: Task = {
  id: "",
  author: "",
  state: taskStatus.DRAFT,
  categoriesOrder: [],
  items: []
}

export const taskReducer = (state = initialState, action: {type: taskReducerActions}): object => {
  const {
    CHANGE,
    DELETE
  } = taskReducerActions
  switch (action.type) {
    case CHANGE:
     return {...state, status: CHANGE }
    case DELETE:
      return { ...state, status: DELETE }
    default:
      return state
  }
}
