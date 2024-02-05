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
  isPublic: boolean;
  email: string;
  followers: User[];
  followings: User[];
};

export type User = WithId & UserNoId;
