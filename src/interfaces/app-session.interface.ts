import { SessionStatus } from '../enum/session-status.enum';

export interface Session {
  key: string;
  sessionName: string;
  taskName: string;
  status: SessionStatus;
  qty: number;
}
