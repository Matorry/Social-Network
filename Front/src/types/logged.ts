import { User } from "../models/user";

export type Logged = {
  user: User;
  token: string;
};
