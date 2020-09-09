import { SessionHost } from './session-host.interface';

export interface Session {
  key: string;
  sessionName: string;
  taskName: string;
  status: string;
  qty: number;
  user: SessionHost;
}
