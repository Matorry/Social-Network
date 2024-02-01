import { WithId } from "../types/withId";
import { User } from "./user";

export type PostNoId = {
  author: User;
  title: string;
  text: string;
  imageUrl: string;
  date: Date;
  likes: User[];
  comments: Comment[];
};

export type Post = WithId & PostNoId;
