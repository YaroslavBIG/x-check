import { ReactText } from 'react';

const SELECT_REVIEW_ROW = 'SELECT_REVIEW_ROW'
const OPEN_REVIEW_FORM = 'OPEN_REVIEW_FORM'
const CLOSE_REVIEW_FORM = 'CLOSE_REVIEW_FORM'

interface ReviewActionType {
  type: string;
  payload: string;
}

export function setRowSelection(payload: ReactText[]) {
  return {
    type: SELECT_REVIEW_ROW,
    payload
  };
}

export function openReviewForm(payload: any) {
  return {
    type: OPEN_REVIEW_FORM,
    payload
  };
}

export function closeReviewForm() {
  return {
    type: CLOSE_REVIEW_FORM
  };
}

const initialState = {
  rows: [],
  isFormOpen: false
};

export default function ReviewReducer(state = initialState, action: ReviewActionType) {
  switch (action.type) {
    case SELECT_REVIEW_ROW:
      return {
        ...state,
        rows: action.payload
      }
    case OPEN_REVIEW_FORM:
      return {
        ...state,
        isFormOpen: true
      }
    case CLOSE_REVIEW_FORM:
      return {
        ...state,
        isFormOpen: false
      }
    default:
      return state
  }
}

