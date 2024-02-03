import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, User, UserNoId } from '../models/user';
import { ApiUsersRepository } from '../services/user.repository';
import { Logged } from '../types/logged';

export const loginThunk = createAsyncThunk<
  Logged,
  { repository: ApiUsersRepository; user: LoginData }
>('users/login', async ({ repository, user }) => {
  const updatedUser = await repository.login(user);

  return updatedUser;
});

export const registerThunk = createAsyncThunk<
  User,
  { repository: ApiUsersRepository; user: UserNoId }
>('users/register', async ({ repository, user }) => {
  const updatedUser = await repository.register(user);

  return updatedUser;
});

export const updateThunk = createAsyncThunk<
  User,
  {
    repository: ApiUsersRepository;
    user: Partial<User>;
    token: string;
    id: string;
  }
>('users/update', async ({ repository, user, token, id }) => {
  const updatedUser = await repository.update(user, id, token);

  return updatedUser;
});

export const followThunk = createAsyncThunk<
  User,
  {
    repository: ApiUsersRepository;
    user: User;
    token: string;
    id: string;
  }
>('users/follow', async ({ repository, user, token, id }) => {
  const updatedUser = await repository.follow(user, id, token);

  return updatedUser;
});

export const unfollowThunk = createAsyncThunk<
  User,
  {
    repository: ApiUsersRepository;
    user: User;
    token: string;
    id: string;
  }
>('users/unfollow', async ({ repository, user, token, id }) => {
  const updatedUser = await repository.unfollow(user, id, token);

  return updatedUser;
});

export const deleteThunk = createAsyncThunk<
  void,
  { repository: ApiUsersRepository; id: string; token: string }
>('users/delete', async ({ repository, id, token }) => {
  const deleteUser = await repository.delete(id, token);

  return deleteUser;
});

export const getUserByIdThunk = createAsyncThunk<
  User,
  { repository: ApiUsersRepository; id: string; token: string }
>('users/searchById', async ({ repository, id, token }) => {
  const User = await repository.getById(id, token);

  return User;
});

export const getUserByUsernameThunk = createAsyncThunk<
  User,
  { repository: ApiUsersRepository; userName: string; token: string }
>('users/searchByName', async ({ repository, userName, token }) => {
  const User = await repository.getByUsername(userName, token);

  return User;
});
