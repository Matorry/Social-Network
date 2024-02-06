import { User, WithId } from "./user";

export type PostNoId = {
  author: User;
  title: string;
  text: string;
  date: Date;
  likes: User[];
};

export type Post = WithId & PostNoId;
