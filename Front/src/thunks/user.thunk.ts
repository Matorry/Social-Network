import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData, User, UserNoId } from "../models/user";
import { ApiUsersRepository } from "../services/user.repository";
import { Logged } from "../types/logged";

export const loginThunk = createAsyncThunk<
  Logged,
  { repository: ApiUsersRepository; user: LoginData }
>("users/login", async ({ repository, user }) => {
  const updatedUser = await repository.login(user);

  return updatedUser;
});

export const registerThunk = createAsyncThunk<
  User,
  { repository: ApiUsersRepository; user: UserNoId }
>("users/register", async ({ repository, user }) => {
  const updatedUser = await repository.register(user);

  return updatedUser;
});

export const updateThunk = createAsyncThunk<
  User,
  { repository: ApiUsersRepository; user: User; token: string }
>("users/update", async ({ repository, user, token }) => {
  const updatedUser = await repository.update(user, user.id, token);

  return updatedUser;
});

export const deleteThunk = createAsyncThunk<
  void,
  { repository: ApiUsersRepository; id: string; token: string }
>("users/delete", async ({ repository, id, token }) => {
  const deleteUser = await repository.delete(id, token);

  return deleteUser;
});
