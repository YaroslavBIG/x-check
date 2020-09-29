import { SessionHost } from './session-host.interface';
import { Task } from './task.interface';

export interface ReviewInterface {
  key: string;
  id: string;
  requestId: string;
  author: string;
  state: string;
}
