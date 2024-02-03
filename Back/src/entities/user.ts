import { Post } from "./post";

export type WithId = {
  id: string;
};

export type LoginData = {
  userName: string;
  passwd: string;
};

export type UserNoId = LoginData & {
  name: string;
  surname: string;
  likes: Post[];
  posts: Post[];
  isPublic: boolean;
  comments: Comment[];
  email: string;
  followers: User[];
  followings: User[];
};

export type User = WithId & UserNoId;
