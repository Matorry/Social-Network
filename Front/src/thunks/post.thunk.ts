import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostNoId } from '../models/post';
import { ApiPostRepository } from '../services/post.repository';

export const createThunk = createAsyncThunk<
  Post,
  { repository: ApiPostRepository; post: PostNoId; token: string }
>('post/create', async ({ repository, post, token }) => {
  const newPost = await repository.create(post, token);

  return newPost;
});
