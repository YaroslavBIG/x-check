import { FirestoreSession } from './firestore-session.interface';
import { ReactText } from 'react';

export interface SessionsRecord {
  [P: string]: FirestoreSession;
}

export interface SessionsState {
  sessions: {
    rows: ReactText[];
    isFormOpen: boolean;
    currentSession: any;
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
      publishedTasks: any[]
    }
  }
}
