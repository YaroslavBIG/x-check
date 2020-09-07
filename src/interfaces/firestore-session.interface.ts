import { Attendee } from './attendee.interface';
import { UserProfileData } from '../components/features/main/Sessions/Sessions';

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
  host: UserProfileData;
}
