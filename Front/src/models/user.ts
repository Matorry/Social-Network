import { WithId } from '../types/withId';
import { Post } from './post';

export type UserNoId = {
  userName: string;
  name: string;
  surname: string;
  followers: User[];
  followings: User[];
  likes: User[];
  posts: Post[];
  comments: [];
  isPublic: boolean;
  email: string;
  passwd: string;
};

export type LoginData = {
  userName: string;
  passwd: string;
};

export type User = WithId & UserNoId;
