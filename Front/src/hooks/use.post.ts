import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post, PostNoId } from '../models/post';
import { ApiPostRepository } from '../services/post.repository';
import { AppDispatch, RootState } from '../store/store';
import {
  createThunk,
  deleteThunk,
  getByAuthorThunk,
  getUserPostsThunk,
  updateThunk,
} from '../thunks/post.thunk';

export const urlBaseUsers = 'http://localhost:3000';

export function usePosts() {
  const repository = useMemo(() => new ApiPostRepository(urlBaseUsers), []);
  const usersState = useSelector((state: RootState) => state.usersState);
  const postState = useSelector((state: RootState) => state.postState);
  const token = usersState.currentUser.token;

  const postsDispatch = useDispatch<AppDispatch>();

  const createPost = async (post: PostNoId) => {
    postsDispatch(createThunk({ repository, post, token }));
  };

  const loadUserPosts = useCallback(
    async (id: string) => {
      postsDispatch(getUserPostsThunk({ repository, id, token }));
    },
    [repository, postsDispatch, token]
  );

  const deletePost = async (id: string) => {
    postsDispatch(deleteThunk({ repository, id, token }));
  };

  const updatePost = async (id: string, data: Partial<Post>) => {
    postsDispatch(updateThunk({ repository, data, id, token }));
  };

  const loadUserFollowingPosts = useCallback(
    async (id: string) => {
      postsDispatch(getByAuthorThunk({ repository, id, token }));
    },
    [repository, postsDispatch, token]
  );

  return {
    loadUserFollowingPosts,
    createPost,
    updatePost,
    deletePost,
    loadUserPosts,
    currentUserPosts: postState.currentUserPosts,
    currentUserFollowingPosts: postState.followingPosts,
  };
}
