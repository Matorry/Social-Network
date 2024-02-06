import { User, WithId } from "./user";

export type PostNoId = {
  author: User;
  title: string;
  text: string;
  date: Date;
  likes: string[];
};

export type Post = WithId & PostNoId;
