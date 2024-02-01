import { Post } from "./post";

export type WithId = {
  id: string;
};

export type LoginData = {
  userName: string;
  passwd: string;
};

export type FollowRelation = {
  followers: User[];
  followings: User[];
};

export type UserNoId = LoginData & {
  name: string;
  surname: string;
  imageUrl: string;
  followingRelations: FollowRelation;
  likes: Post[];
  posts: Post[];
  isPublic: boolean;
  comments: Comment[];
  email: string;
};

export type User = WithId & UserNoId;
