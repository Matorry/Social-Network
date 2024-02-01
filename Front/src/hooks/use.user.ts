import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginData } from "../models/user";
import { ApiUsersRepository } from "../services/user.repository";
import { AppDispatch, RootState } from "../store/store";
import { loginThunk } from "../thunks/user.thunk";

export const urlBaseUsers = "http://localhost:3000";

export function useUsers() {
  const repository = useMemo(() => new ApiUsersRepository(urlBaseUsers), []);

  const usersState = useSelector((state: RootState) => state.usersState);
  const usersDispatch = useDispatch<AppDispatch>();

  const loginUser = async (user: LoginData) => {
    usersDispatch(loginThunk({ repository, user }));
  };

  return {
    user: usersState.currentUser.user,
    error: usersState.error,
    status: usersState.userStatus,
    token: usersState.currentUser.token,
    loginUser,
  };
}
