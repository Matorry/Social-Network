import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginData, User, UserNoId } from '../models/user';
import { ApiUsersRepository } from '../services/user.repository';
import { actions } from '../slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import {
  deleteThunk,
  followThunk,
  getUserByIdThunk,
  getUserByUsernameThunk,
  loginThunk,
  registerThunk,
  unfollowThunk,
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

  const updateUser = async (user: Partial<User>, id: string) => {
    usersDispatch(updateThunk({ repository, user, token, id }));
  };

  const deleteUser = async (id: string) => {
    usersDispatch(deleteThunk({ repository, id, token }));
    logout();
  };

  const followUser = async (id: string, user: User) => {
    await usersDispatch(followThunk({ repository, id, token, user }));
  };

  const unfollowUser = async (id: string, user: User) => {
    await usersDispatch(unfollowThunk({ repository, id, token, user }));
  };

  const getUserById = async (id: string) => {
    usersDispatch(
      getUserByIdThunk({
        repository,
        id,
        token,
      })
    );
    setUserSearch();
  };

  const searchUserByName = async (userName: string) => {
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

  const setUserSearch = () => {
    usersDispatch(actions.setUserSearch());
  };

  return {
    currentUser: usersState.currentUser.user,
    error: usersState.error,
    isLoading: usersState.isLoading,
    status: usersState.status,
    token: usersState.currentUser.token,
    search: usersState.search,
    userDetail: usersState.userDetail,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    logout,
    searchUserByName,
    followUser,
    getUserById,
    unfollowUser,
  };
}
