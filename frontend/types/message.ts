import { User } from './user';

export interface Message {
  id: number;
  user_id: number;
  channel_id: number;
  body: string;
  user: User;
}