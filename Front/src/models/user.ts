import { WithId } from "../types/withId";
import { Post } from "./post";

export type UserNoId = {
  userName: string;
  name: string;
  surname: string;
  imageUrl: string;
  followingRelations: FollowRelation;
  likes: Post[];
  posts: Post[];
  isPublic: boolean;
  comments: Comment[];
  email: string;
  paswd: string;
};

export type FollowRelation = {
  followers: User[];
  followings: User[];
};

export type LoginData = {
  userName: string;
  password: string;
};

export type User = WithId & UserNoId;
