import { Itask, taskStatus } from "components/Tasks/TaskInterface"
import { taskReducerActions } from "./actions"

export const initialTaskState: Itask = {
  id: "",
  author: "",
  state: taskStatus.DRAFT,
  categoriesOrder: [],
  items: []
}

export const taskReducer = (state = initialTaskState, action: any) => {
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
