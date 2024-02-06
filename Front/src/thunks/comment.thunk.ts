import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentNoId } from '../models/comment';
import { ApiCommentRepository } from '../services/comment.repository';

export const createThunk = createAsyncThunk<
  Comment,
  { repository: ApiCommentRepository; comment: CommentNoId; token: string }
>('post/create', async ({ repository, comment, token }) => {
  const newComment = await repository.create(comment, token);

  return newComment;
});

export const getByPostThunk = createAsyncThunk<
  Comment[],
  {
    repository: ApiCommentRepository;
    id: string;
    token: string;
  }
>('post/search-post', async ({ repository, id, token }) => {
  const comments = await repository.getByPost(id, token);

  return comments;
});
