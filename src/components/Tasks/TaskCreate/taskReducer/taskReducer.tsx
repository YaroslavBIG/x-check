export enum taskReducerActions {
  CHANGE = 'CHANGE',
  DELETE = 'DELETE',
}

const task = {
  id: "",
  author: "",
  state: "",
  categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
  items: []
}

export const taskReducer = (state = task, action: {type: taskReducerActions}): object => {
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
