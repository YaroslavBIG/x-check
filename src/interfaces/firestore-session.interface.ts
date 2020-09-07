import { Attendee } from './attendee.interface';

export interface FirestoreSession {
  name: string;
  status: string;
  createdBy: string;
  task: {
    taskId: string;
    taskName: string;
  },
  coefficient: number,
  discardMinScore: boolean;
  discardMaxScore: boolean;
  minReviewsAmount: number;
  desiredReviewersAmount: number;
  attendeeIds: string[];
  attendees: Attendee[];
}
