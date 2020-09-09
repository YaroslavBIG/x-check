import { ReactText } from 'react';
import { FirestoreSession } from '../../../../interfaces/firestore-session.interface';

enum SESSION_TYPES {
  SET_SELECTED_ROWS,
  OPEN_SESSION_FORM,
  CLOSE_SESSION_FORM
}

export function setRowSelection(payload: ReactText[]) {
  return {
    type: SESSION_TYPES.SET_SELECTED_ROWS,
    payload
  };
}

export function openSessionForm(payload: FirestoreSession | null) {
  return {
    type: SESSION_TYPES.OPEN_SESSION_FORM,
    payload
  };
}

export function closeSessionForm() {
  return {
    type: SESSION_TYPES.CLOSE_SESSION_FORM,
  };
}

const initialState = {
  rows: [],
  isFormOpen: false,
  currentSession: null
};

interface SessionActionType {
  type: SESSION_TYPES;
  payload: string;
}

export default function SessionsReducer(state = initialState, action: SessionActionType) {
  switch (action.type) {
    case SESSION_TYPES.SET_SELECTED_ROWS:
      return {
        ...state,
        rows: action.payload
      };
    case SESSION_TYPES.CLOSE_SESSION_FORM:
      return {
        ...state,
        isFormOpen: false,
        currentSession: null
      };
    case SESSION_TYPES.OPEN_SESSION_FORM:
      return {
        ...state,
        isFormOpen: true,
        currentSession: action.payload
      };
    default:
      return state;
  }
}
