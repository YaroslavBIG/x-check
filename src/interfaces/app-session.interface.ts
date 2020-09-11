import { SessionHost } from './session-host.interface';
import { Task } from './task.interface';

export interface Session {
  key: string;
  sessionName: string;
  taskName: string;
  status: string;
  qty: number;
  user: SessionHost;
  task: Task;
  id?: string;
}
