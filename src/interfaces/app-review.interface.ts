import { SessionHost } from './session-host.interface';
import { Task } from './task.interface';

export interface AppReviewInterface {
  key: string;
  id: string;
  requestId: string;
  author: string;
  state: string;
}
