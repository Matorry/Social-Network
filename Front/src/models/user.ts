import { WithId } from '../types/withId';

export type UserNoId = {
  userName: string;
  name: string;
  surname: string;
  followers: User[];
  followings: User[];
  likes: User[];
  posts: [];
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
