import { WithId } from "../types/withId";
import { Post } from "./post";
import { User } from "./user";

export type CommentNoId = {
  id: string;
  author: User;
  post: Post;
  text: string;
  date: Date;
};

export type Comment = WithId & CommentNoId;
