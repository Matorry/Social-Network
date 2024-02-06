import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentNoId } from '../models/comment';
import { ApiCommentRepository } from '../services/comment.repository';
import { AppDispatch, RootState } from '../store/store';
import { createThunk, getByPostThunk } from '../thunks/comment.thunk';

export const urlBaseUsers = 'http://localhost:3000';

export function useComment() {
  const repository = useMemo(() => new ApiCommentRepository(urlBaseUsers), []);
  const commentState = useSelector((state: RootState) => state.commentState);
  const usersState = useSelector((state: RootState) => state.usersState);
  const token = usersState.currentUser.token;

  const commentDispatch = useDispatch<AppDispatch>();

  const createComment = async (comment: CommentNoId) => {
    commentDispatch(createThunk({ repository, comment, token }));
  };

  const loadPostComments = useCallback(
    async (id: string) => {
      commentDispatch(getByPostThunk({ repository, id, token }));
    },
    [repository, commentDispatch, token]
  );

  return {
    createComment,
    loadPostComments,
    currentPostComments: commentState.currentPostComments,
  };
}
