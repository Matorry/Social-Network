import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostNoId } from '../models/post';
import { ApiPostRepository } from '../services/post.repository';
import { AppDispatch, RootState } from '../store/store';
import { createThunk } from '../thunks/post.thunk';

export const urlBaseUsers = 'http://localhost:3000';

export function usePosts() {
  const repository = useMemo(() => new ApiPostRepository(urlBaseUsers), []);
  const usersState = useSelector((state: RootState) => state.usersState);
  const token = usersState.currentUser.token;

  const usersDispatch = useDispatch<AppDispatch>();

  const createPost = async (post: PostNoId) => {
    usersDispatch(createThunk({ repository, post, token }));
  };

  return {
    createPost,
  };
}
