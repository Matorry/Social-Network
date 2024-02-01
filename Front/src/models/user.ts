import { WithId } from "../types/withId";

export type UserNoId = {
  userName: string;
  name: string;
  surname: string;
  imageUrl: string;
  followingRelations: FollowRelation;
  likes: [];
  posts: [];
  comments: [];
  isPublic: boolean;
  email: string;
  passwd: string;
};

export type FollowRelation = {
  followers: User[];
  followings: User[];
};

export type LoginData = {
  userName: string;
  passwd: string;
};

export type User = WithId & UserNoId;
