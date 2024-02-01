import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../models/user";
import { ApiUsersRepository } from "../services/user.repository";
import { Logged } from "../types/logged";

export const loginThunk = createAsyncThunk<
  Logged,
  { repository: ApiUsersRepository; user: LoginData }
>("users/update", async ({ repository, user }) => {
  const updatedUser = await repository.login(user);

  return updatedUser;
});
