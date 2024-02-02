import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginData, User, UserNoId } from '../models/user';
import { ApiUsersRepository } from '../services/user.repository';
import { actions } from '../slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import {
  deleteThunk,
  getUserByUsernameThunk,
  loginThunk,
  registerThunk,
  updateThunk,
} from '../thunks/user.thunk';

export const urlBaseUsers = 'http://localhost:3000';

export function useUsers() {
  const repository = useMemo(() => new ApiUsersRepository(urlBaseUsers), []);
  const usersState = useSelector((state: RootState) => state.usersState);
  const token = usersState.currentUser.token;

  const usersDispatch = useDispatch<AppDispatch>();

  const loginUser = async (user: LoginData) => {
    usersDispatch(loginThunk({ repository, user }));
  };

  const registerUser = async (user: UserNoId) => {
    usersDispatch(registerThunk({ repository, user }));
  };

  const updateUser = async (user: User) => {
    usersDispatch(updateThunk({ repository, user, token }));
  };

  const deleteUser = async (id: string) => {
    usersDispatch(deleteThunk({ repository, id, token }));
    logout();
  };

  const searchUser = async (userName: string) => {
    usersDispatch(
      getUserByUsernameThunk({
        repository,
        userName,
        token,
      })
    );
  };

  const logout = () => {
    usersDispatch(actions.logoutUser());
  };

  return {
    currentUser: usersState.currentUser.user,
    error: usersState.error,
    isLoading: usersState.isLoading,
    status: usersState.status,
    token: usersState.currentUser.token,
    search: usersState.search,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    logout,
    searchUser,
  };
}
