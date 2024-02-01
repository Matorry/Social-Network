import { User, WithId } from "./user";

export type PostNoId = {
  id: string;
  author: User;
  title: string;
  text: string;
  imageUrl: string;
  date: Date;
  likes: User[];
  comments: Comment[];
};

export type Post = WithId & PostNoId;
