import { ReactText } from 'react';

export interface ReviewState {
  id: string,
  reviews: {
    rows: ReactText[];
    isFormOpen: boolean;
    currentReview: ReviewState;
  },
  firestore: {
    data: {
      reviews: any,
    }
  }
}
