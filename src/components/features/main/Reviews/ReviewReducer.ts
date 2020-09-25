import React, { ReactText } from 'react';
import { FirestoreSessionData } from '../../../../interfaces/firestore-session.interface';

const SELECT_REVIEW_ROW = 'SELECT_REVIEW_ROW'
const OPEN_REVIEW_FORM = 'OPEN_SESSION_FORM'

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
    default:
      return state
  }
}

