import { ReactText } from 'react';

export interface ReviewState {
  reviews: {
    rows: ReactText[];
    isFormOpen: boolean;
  },
  firestore: {
    data: {
      reviews: any,
    }
  }
}
