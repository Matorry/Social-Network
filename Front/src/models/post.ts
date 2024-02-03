import { WithId } from '../types/withId';
import { User } from './user';

export type PostNoId = {
  id: string;
  author: User;
  title: string;
  text: string;
  date: Date;
  likes: User[];
  comments: [];
};

export type Post = WithId & PostNoId;
