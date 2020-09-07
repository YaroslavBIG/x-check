import { ReactText } from 'react';

const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';

export function setRowSelection(payload: ReactText[]) {
  return {
    type: SET_SELECTED_ROWS,
    payload
  };
}

const initialState = {
  rows: []
};

interface SessionActionType {
  type: typeof SET_SELECTED_ROWS,
  payload: string;
}

export default function SessionsReducer(state = initialState, action: SessionActionType) {
  switch (action.type) {
    case SET_SELECTED_ROWS:
      return {
        ...state,
        rows: action.payload
      };
    default:
      return state;
  }
}
