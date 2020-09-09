import { Attendee } from './attendee.interface';
import { SessionHost } from './session-host.interface';

export interface FirestoreSessionData {
  name: string;
  status: string;
  createdBy?: string;
  description?: string;
  task: {
    taskId: string;
    taskName: string;
  },
  coefficient: number,
  discardMinScore: boolean;
  discardMaxScore: boolean;
  minReviewsAmount: number;
  desiredReviewersAmount: number;
  attendeeIds?: string[];
  attendees?: Attendee[];
  host: SessionHost;
}
