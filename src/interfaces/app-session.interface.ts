import { UserProfileData } from '../components/features/main/Sessions/Sessions';

export interface Session {
  key: string;
  sessionName: string;
  taskName: string;
  status: string;
  qty: number;
  user: UserProfileData;
}
