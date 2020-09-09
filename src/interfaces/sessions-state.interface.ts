import { FirestoreSessionData } from './firestore-session.interface';
import { ReactText } from 'react';
import { Session } from './app-session.interface';
import { TaskRecord } from './task.interface';

export interface SessionsRecord {
  [P: string]: FirestoreSessionData;
}

export interface SessionsState {
  sessions: {
    rows: ReactText[];
    isFormOpen: boolean;
    currentSession: Session;
  },
  firebase: {
    auth: {
      uid: string;
    }
    profile: {
      displayName: string;
      photoURL: string;
    }
  },
  firestore: {
    status: {
      requesting: {
        sessions: boolean;
      }
    }
    data: {
      sessions: SessionsRecord;
      publishedTasks: TaskRecord;
    }
  }
}
