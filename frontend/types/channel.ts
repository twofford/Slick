import { Message } from './message';

export type ChannelType = 'pubic' | 'private' | 'dm'

export interface Channel {
  id: number;
  title: string;
  channel_type: ChannelType;
  topic: string;
  description: string;
  messages: Message[];
}